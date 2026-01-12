const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', () => {
    if (input.value.trim() !== "") {
        const li = document.createElement('li');
        li.innerHTML = `${input.value} <span class="delete-btn">X</span>`;
        todoList.appendChild(li);
        input.value = "";
        
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
        });
    }
});