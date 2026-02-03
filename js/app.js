// TO-DO List Manager - SBA 316
// ================================

let taskArray = [];
let taskCounter = 0;
let taskIdCounter = 1;

//============== DOM Elements ==============
const taskForm = document.getElementById('task-form');
const taskInput = document.querySelector('task-input');
const prioritySelect = document.getElementById('task-priority');
const dueDateInput = document.getElementById('task-due');
const taskList = document.getElementById('task-list');
const taskCount = document.querySelector('task-count');
const taskTemplate = document.getElementById('task-template');
const errorMessage = document.getElementById('error-message');
const emptyMessage = document.getElementById('empty-message');

//========== Submit Event Handling ===========
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateForm(taskInput.value);
    if (isValid) {
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

        alert('Task successfully added!');
        taskInput.value = '';
        errorMessage.textContent ='';
    } else{
        alert('Invalid task!');
    }
        
});

//========== Form Validation ==========
function validateForm(taskText) {
    const text = taskText.trim();
    if (text === "") {
        errorMessage.textContent= 'Task must be filled out';
        return false;        
    }

    if (text.length < 3 ) {
        errorMessage.textContent = `Must be at least ${input.minLength} characters`;
        return false;
    }

    if (text.length > 100) {
        errorMessage.textContent = `Must be no more than ${input.maxLength} characters`;
        return false;
    }else{
        errorMessage.textContent = ""; 
        return true; 
    }
}

// ========== Render Task ==========
function renderTask(task) {
    const clone = taskTemplate.content.cloneNode(true);
    const li = clone.querySelector('.task-item');

    li.dataset.id = task.id;
    li.querySelector('task-text').textContent = task.text;
    li.querySelector('task-priority-badge').textContent = task.priority;
    li.querySelector('task-due-date').textContent = task.dueDate;
    
    //Button events 
    li.querySelector('btn.edit').addEventListener('click', () =>{
        const id = li.dataset.id;
        const task = taskArray.find(t => t.id == id);
        taskInput.value = task.text;
        prioritySelect.value = task.priority;
        dueDateInput.value = task.dueDate;
        editingId =id;
    });

    li.querySelector('btn-delete').addEventListener('click', () => {
        const id = li.dataset.id;
        const task = taskArray.find(t => t.id != id);
        li.remove();
    });
    return li;
}




// function generateTaskId(){
//     let taskId = 1;

//     addTaskBtn.addEventListener('click', () => {
//         taskId++;
//     });
//     return taskId;
// }

// function createTask(taskData) {
//     return {
//         id: generateTaskId(),
//         task: taskData.task.trim(),
//         priority: taskData.priority,
//         dueDate: taskData.dueDate,
//         completed: false,
//         createdAt: Date.now()
//     };
// }

// function renderTask(task) {
//     // Clone the template
//     const clone = taskTemplate.content.cloneNode(true);
//     const li = clone.querySelector('.task-item');
    
//     // Set data attribute
//     
    
//     // Fill in content 
//     li.querySelector('.task').textContent = task.task;
       
//     // Priority badge
//     const priorityBadge = li.querySelector('.task-priority-badge');
//     priorityBadge.textContent = task.priority;
//     priorityBadge.classList.add(task.priority);
    
//     // Due date
//     const dueDateSpan = li.querySelector('.task-due-date');
//     if (task.dueDate) {
//         dueDateSpan.textContent = formatDate(task.dueDate);
//         if (isOverdue(task.dueDate) && !task.completed) {
//             dueDateSpan.classList.add('overdue');
//         }
//     }
    
//     // Completed state
//     const checkbox = li.querySelector('.complete-checkbox');
//     checkbox.checked = task.completed;
//     if (task.completed) {
//         li.classList.add('completed');
//     }
    
//     return li;

// }

// function renderAllTasks() {
//     // Clear the list
//     taskList.innerHTML = '';
        
//     // Use DocumentFragment for performance
//     const fragment = document.createDocumentFragment();
      
//     // Append all at once
//     taskList.appendChild(fragment);
    
//     // Show/hide empty message
//     if (filteredTasks.length === 0) {
//         emptyMessage.classList.remove('hidden');
//     } else {
//         emptyMessage.classList.add('hidden');
//     }
    
//     // Update count
//    // updateTaskCount();
// }

// function deleteTask(id) {
//     // Confirm deletion
//     if (!confirm('Are you sure you want to delete this task?')) {
//         return;
//     }
    
//     // Remove from array
//     tasks = tasks.filter(task => task.id !== id);
    
//     // Save and re-render
//     saveTasks();
//     renderAllTasks();
// }

// function toggleComplete(id) {
//     // Find task
//     const task = tasks.find(t => t.id === id);
//     if (task) {
//         task.completed = !task.completed;
//         saveTasks();
//         renderAllTasks();
//     }
// }

// function updateTask(id, updates) {
//     const taskIndex = tasks.findIndex(t => t.id === id);
//     if (taskIndex !== -1) {
//         tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
//         saveTasks();
//         renderAllTasks();
//     }
// }

// function editTask(id) {
//     const task = tasks.find(t => t.id === id);
//     if (!task) return;
    
//     // Populate form
//     titleInput.value = task.title;
//     descriptionInput.value = task.description;
//     prioritySelect.value = task.priority;
//     dueDateInput.value = task.dueDate;
    
//     // Update character count
//     descCountSpan.textContent = task.description.length;
    
//     // Change button text
//     addTaskBtn.textContent = 'Update Task';
    
//     // Store editing ID
//     editingId = id;
    
//     // Scroll to form
//     taskForm.scrollIntoView({ behavior: 'smooth' });
// }





// // Function to handle the deletion of an item
// function deleteItem(event) {
//     // The parentNode of the button is the <li>
//     const listItem = event.target.parentNode;
//     const list = listItem.parentNode;
//     list.removeChild(listItem);
// }


// // Function to add a new item from the input field
// function addItem() {
//     const newItemInput = document.getElementById('newItemText');
//     const itemText = newItemInput.value.trim();


//     if (itemText !== '') {
//         const todoList = document.getElementById('todoList');
//         const newListItem = createListItem(itemText);
//         todoList.appendChild(newListItem);
//         newItemInput.value = ''; // Clear the input field
//     } else {
//         alert('Please enter an item.');
//     }
// }


// // Optional: Add some initial items when the page loads
// document.addEventListener('DOMContentLoaded', (event) => {
//     const todoList = document.getElementById('todoList');
//     todoList.appendChild(createListItem('Learn JavaScript DOM Manipulation'));
//     todoList.appendChild(createListItem('Build a simple todo app'));
// });
