// TO-DO List Manager - SBA 316
// ================================

let taskArray = [];
let taskCounter = 1;
let editingId = 1;

//============== DOM Elements ==============
const taskForm = document.getElementById('task-form');
const taskInput = document.querySelector('#task-input');
const prioritySelect = document.getElementById('task-priority');
const dueDateInput = document.getElementById('task-due');
const taskList = document.getElementById('task-list');
const taskCount = document.querySelector('#task-count');
const taskTemplate = document.getElementById('task-template');
const errorMessage = document.getElementById('error-message');
const emptyMessage = document.getElementById('empty-message');
const addTaskBtn = document.getElementById('add-task-btn');

//============== BOM: LocalStorage ==============
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

function loadTasks(){
    
}



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
        //console.log(taskArray);
        const taskElement = renderTask(task);
        taskList.appendChild(taskElement);
        updateTaskCounter();

        alert('Task successfully added!');
        taskInput.value = '';
        errorMessage.textContent ='';
        emptyMessage.textContent = '';
       
    } else{
        alert('Invalid task!');
    }
        
});

//========== Form Validation ==========
function validateForm(taskText) {
    const text = taskText.trim();
    if (text === "") {
        errorMessage.textContent = 'Task must be filled out';
        return false;        
    }

    if (text.length < 3 ) {
        errorMessage.textContent = `Must be at least 3 characters`;
        return false;
    }

    if (text.length > 100) {
        errorMessage.textContent = `Must be no more than 100 characters`;
        return false;
    }else{
        errorMessage.textContent = ''; 
        return true; 
    }
}

// ========== Render Task ==========
function renderTask(task) {
    const clone = taskTemplate.content.cloneNode(true);
    const li = clone.querySelector('.task-item');

    li.dataset.id = task.id;
    li.querySelector('.task-text').textContent = task.text;
    li.querySelector('.task-priority-badge').textContent = task.priority;
    li.querySelector('.task-due-date').textContent = task.dueDate;
    
    //Button events 
    li.querySelector('.btn-edit').addEventListener('click', () =>{
        const id = li.dataset.id;
        const task = taskArray.find(t => t.id == id);
        taskInput.value = task.text;
        prioritySelect.value = task.priority;
        dueDateInput.value = task.dueDate;
        editingId =id;
    });

    li.querySelector('.btn-delete').addEventListener('click', () => {
        const id = li.dataset.id;
        const task = taskArray.filter(t => t.id != id);
        li.remove();
    });
    return li;
}

// ========== Update Task Counter ==========
function updateTaskCounter(){
     taskCount.textContent = `Total tasks: ${taskArray.length}`;
}