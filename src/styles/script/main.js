const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');

let tasks = [];

function updateCounter() {
    const completed = tasks.filter(t => t.done).length;
    taskCount.innerText = `${completed} of ${tasks.length} Tasks`;
}

addBtn.addEventListener('click', () => {
    if (input.value.trim() === "") return;

    const task = { text: input.value, done: false, id: Date.now() };
    tasks.push(task);
    
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="checkbox"></div>
        <span class="text">${task.text}</span>
        <span class="delete">✕</span>
    `;

    li.querySelector('.checkbox').addEventListener('click', () => {
        task.done = !task.done;
        li.classList.toggle('completed');
        updateCounter();
    });

    li.querySelector('.delete').addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        updateCounter();
    });

    todoList.appendChild(li);
    input.value = "";
    updateCounter();
});