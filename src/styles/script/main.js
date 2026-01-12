const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', addTask);

function addTask() {
    const taskValue = input.value.trim();
    if (taskValue === "") return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskValue}</span>
        <span class="delete-btn">Delete</span>
    `;

    // Task එක Click කළ විට සම්පූර්ණ කළ බව පෙන්වීම
    li.querySelector('.task-text').addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Delete කිරීමේ පහසුකම
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });

    todoList.appendChild(li);
    input.value = "";
}