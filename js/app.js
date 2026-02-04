// TO-DO List Manager - SBA 316
// ================================

let taskArray = [];
let taskIdCounter = 1;
let editingId = null;

//============== DOM Elements ==============
const taskForm = document.getElementById('task-form');
const taskInput = document.querySelector('#task-input');
const prioritySelect = document.getElementById('task-priority');
const dueDateInput = document.getElementById('task-due');
const taskList = document.getElementById('task-list');
const taskCount = document.querySelector('#task-count');
const taskTemplate = document.getElementById('task-template');
const errorMessage = document.querySelector('.error-message'); 
const emptyMessage = document.getElementById('empty-message');
const addTaskBtn = document.getElementById('add-task-btn');

//============== BOM: LocalStorage ==============
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        taskArray = JSON.parse(saved);
        taskIdCounter = Math.max(...taskArray.map(t => t.id), 0) + 1;
        taskArray.forEach(task => {
            const taskElement = renderTask(task);
            taskList.appendChild(taskElement);
        });
        updateTaskCount();
        toggleEmptyMessage();
    }
}

// Window.addEventListener
window.addEventListener('load', () => {
    loadTasks();
});

//========== Submit Event Handling ===========
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateForm(taskInput.value);
    if (isValid) {
        if (editingId) {
            // Update existing task
            const task = taskArray.find(t => t.id == editingId);
            task.text = taskInput.value.trim();
            task.priority = prioritySelect.value;
            task.dueDate = dueDateInput.value;
            
            // Iterate over collection
            const allTasks = taskList.querySelectorAll('.task-item');
            allTasks.forEach(item => {
                if (item.dataset.id == editingId) {
                    item.querySelector('.task-text').textContent = task.text;
                    item.querySelector('.task-priority-badge').textContent = task.priority;
                    item.querySelector('.task-due-date').textContent = task.dueDate || 'No due date';
                    
                    // Modify classList
                    item.querySelector('.task-priority-badge').className = 'task-priority-badge';
                    item.querySelector('.task-priority-badge').classList.add(`priority-${task.priority}`);
                }
            });
            
            addTaskBtn.textContent = 'Add Task';
            // Modify attribute
            addTaskBtn.removeAttribute('data-editing');
            editingId = null;
        } else {
            //====== Create Task ======
            const task = {
                id: taskIdCounter++,
                text: taskInput.value.trim(),
                priority: prioritySelect.value,
                dueDate: dueDateInput.value,
                completed: false
            };

            taskArray.push(task);
            
            const taskElement = renderTask(task);
            taskList.appendChild(taskElement);
        }

        saveTasks();
        updateTaskCount();
        toggleEmptyMessage();
        taskForm.reset();
        errorMessage.textContent = '';
    }
});

//========== Form Validation ==========
function validateForm(taskText) {
    const text = taskText.trim();

    if (!errorMessage) return false;

    if (text === "") {
        errorMessage.textContent = 'Task must be filled out';
        return false;        
    }

    if (text.length < 3) {
        errorMessage.textContent = 'Must be at least 3 characters'; 
        return false;
    }

    if (text.length > 100) {
        errorMessage.textContent = 'Must be no more than 100 characters'; 
        return false;
    }
    
    errorMessage.textContent = ''; 
    return true; 
}

// ========== Render Task ==========
function renderTask(task) {
    const clone = taskTemplate.content.cloneNode(true);
    const li = clone.querySelector('.task-item');

    li.dataset.id = task.id;
    
    // Modify text content
    li.querySelector('.task-text').textContent = task.text;
    li.querySelector('.task-priority-badge').textContent = task.priority;
    li.querySelector('.task-due-date').textContent = task.dueDate || 'No due date';
    
    // Modify classList based on priority
    const badge = li.querySelector('.task-priority-badge');
    badge.classList.add(`priority-${task.priority}`);
    
    const checkbox = li.querySelector('.complete-checkbox');
    checkbox.checked = task.completed;
    
    if (task.completed) {
        li.classList.add('completed');
        // Modify style property
        li.querySelector('.task-text').style.textDecoration = 'line-through';
    }
    
    //Event listener - Checkbox
    checkbox.addEventListener('change', (e) => {
        const id = li.dataset.id;
        const task = taskArray.find(t => t.id == id);
        task.completed = e.target.checked;
        
        if (e.target.checked) {
            li.classList.add('completed');
            li.querySelector('.task-text').style.textDecoration = 'line-through';
            li.querySelector('.task-text').style.opacity = '0.6';
        } else {
            li.classList.remove('completed');
            li.querySelector('.task-text').style.textDecoration = 'none';
            li.querySelector('.task-text').style.opacity = '1';
        }
        
        saveTasks();
        updateTaskCount();
    });

    //Event listener - Edit button
    li.querySelector('.btn-edit').addEventListener('click', () => {
        const id = li.dataset.id;
        const task = taskArray.find(t => t.id == id);
        taskInput.value = task.text;
        prioritySelect.value = task.priority;
        dueDateInput.value = task.dueDate;
        editingId = id;
        
        addTaskBtn.textContent = 'Update Task';
        // Modify attribute
        addTaskBtn.setAttribute('data-editing', id);
        
        // Scroll to form
        taskForm.scrollIntoView({ behavior: 'smooth' });
    });

    //Event listener - Delete button
    li.querySelector('.btn-delete').addEventListener('click', () => {
        const id = li.dataset.id;
        
        // Parent-child-sibling navigation
        const parentList = li.parentNode; // Get parent
        const nextTask = li.nextElementSibling; // Get next sibling
        const prevTask = li.previousElementSibling; // Get previous sibling
        
        // Delete task from array
        taskArray = taskArray.filter(t => t.id != id);
        
        li.remove();
        saveTasks();
        updateTaskCount();
        toggleEmptyMessage();
    });
    
    return li;
}

// ========== Update Task Count ==========
function updateTaskCount() {
    const total = taskArray.length;
    const completed = taskArray.filter(t => t.completed).length;
    taskCount.textContent = `Total tasks: ${total} | Completed: ${completed}`;
}

// ========== Toggle Empty Message ==========
function toggleEmptyMessage() {
    if (taskArray.length === 0) {
        emptyMessage.style.display = 'block';
        taskList.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        taskList.style.display = 'block';
    }
}

// ========== Filter Functions ==========
function createFilterButtons() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.id = 'filter-container';
    
    const filterLabel = document.createElement('span');
    filterLabel.textContent = 'Filter by: ';
    filterLabel.style.fontWeight = 'bold';
    filterLabel.style.marginRight = '10px';
    
    filterContainer.appendChild(filterLabel);
    
    const filters = ['all', 'high', 'medium', 'low'];
    filters.forEach(filter => {
        const btn = document.createElement('button');
        btn.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
        btn.className = 'filter-btn';
        btn.dataset.filter = filter;
        
        if (filter === 'all') {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            filterByPriority(filter);
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
        
        filterContainer.appendChild(btn);
    });
    
    //Use prepend to add to DOM
    const taskListSection = document.querySelector('.task-list-section');
    taskListSection.prepend(filterContainer);
}

//Iterate over a collection
function filterByPriority(priority) {
    const allTasks = taskList.querySelectorAll('.task-item');
    allTasks.forEach(task => {
        const taskPriority = task.querySelector('.task-priority-badge').textContent;
        if (priority === 'all' || taskPriority === priority) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Initialize filter buttons when page loads
window.addEventListener('DOMContentLoaded', () => {
    createFilterButtons();
});

