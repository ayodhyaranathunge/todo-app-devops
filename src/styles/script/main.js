const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const filterBtns = document.querySelectorAll('.filter-item');

let tasks = JSON.parse(localStorage.getItem('premiumTasks')) || [];
let currentFilter = 'all';

function updateUI() {
    localStorage.setItem('premiumTasks', JSON.stringify(tasks));
    todoList.innerHTML = '';

    const filtered = tasks.filter(t => {
        if (currentFilter === 'active') return !t.done;
        if (currentFilter === 'completed') return t.done;
        return true;
    });

    filtered.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-card ${task.done ? 'completed' : ''}`;
        div.innerHTML = `
            <div class="check-circle" onclick="toggleTask(${task.id})"></div>
            <span class="task-text">${task.text}</span>
            <span class="delete-action" onclick="deleteTask(${task.id})">✕</span>
        `;
        todoList.appendChild(div);
    });

    const doneCount = tasks.filter(t => t.done).length;
    taskCount.innerText = `${doneCount} of ${tasks.length} Tasks Completed...`;
}

addBtn.onclick = () => {
    if (input.value.trim()) {
        tasks.push({ id: Date.now(), text: input.value, done: false });
        input.value = '';
        updateUI();
    }
};

window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    updateUI();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    updateUI();
};

filterBtns.forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.filter-item.active').classList.remove('active');
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        updateUI();
    };
});

updateUI();