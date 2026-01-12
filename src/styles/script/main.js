// ==========================================
// 1. Dashboard Logic 
// (පිටුව Dashboard එක නම් පමණක් ක්‍රියා කරයි)
// ==========================================
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

if (input && addBtn && todoList) {
    let tasks = JSON.parse(localStorage.getItem('gridTasks')) || [];
    
    function renderDashboard() {
        localStorage.setItem('gridTasks', JSON.stringify(tasks));
        todoList.innerHTML = '';
        
        tasks.forEach(task => {
            const item = document.createElement('div');
            item.className = `task-item ${task.done ? 'done' : ''}`;
            
            // Randomly changing border colors
            const borderColors = ['#4834d4', '#eb4d4b', '#f0932b', '#22a6b3'];
            item.style.borderLeftColor = borderColors[task.id % 4];

            item.innerHTML = `
                <div onclick="toggleTask(${task.id})">
                    <h4>${task.text}</h4>
                    <p>${task.done ? 'Finished' : '10.40 pm'}</p>
                </div>
                <div style="font-size: 8px; margin-top: 10px; color: #ccc;" onclick="deleteTask(${task.id})">✕</div>
            `;
            todoList.appendChild(item);
        });
    }

    addBtn.onclick = () => {
        if (input.value.trim()) {
            tasks.push({ id: Date.now(), text: input.value, done: false });
            input.value = '';
            renderDashboard();
        }
    };

    window.toggleTask = (id) => {
        tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
        renderDashboard();
    };

    window.deleteTask = (id) => {
        tasks = tasks.filter(t => t.id !== id);
        renderDashboard();
    };

    renderDashboard();
}

// ==========================================
// 2. Side Menu Logic 
// (සියලුම පිටුවලට පොදුයි - Home, Settings, etc.)
// ==========================================
const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('menu-overlay');

if (menuBtn && sideMenu && overlay) {
    menuBtn.addEventListener('click', () => {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
    });

    overlay.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// ==========================================
// 3. Settings Toggle Logic 
// (පිටුව Settings නම් පමණක් ක්‍රියා කරයි)
// ==========================================
const darkSwitch = document.getElementById('dark-mode-switch');
const notifSwitch = document.getElementById('notif-switch');

// Dark Mode එක කලින් 'On' කර තිබුණේදැයි පරීක්ෂා කිරීම (මුළු App එකටම)
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    // Settings පිටුවේ ඉන්නවා නම් පමණක් switch එක active පෙන්වන්න
    if (darkSwitch) darkSwitch.classList.add('active');
}

// Dark Mode Toggle කිරීමේ ක්‍රියාවලිය
if (darkSwitch) {
    darkSwitch.addEventListener('click', function() {
        this.classList.toggle('active');
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// Notification Toggle කිරීමේ ක්‍රියාවලිය
if (notifSwitch) {
    notifSwitch.addEventListener('click', function() {
        this.classList.toggle('active');
        const status = this.classList.contains('active') ? 'Enabled' : 'Disabled';
        localStorage.setItem('notifications', status);
    });
}

// Filter Logic කොටස main.js එකේ තිබිය යුතුයි
const filterTabs = document.querySelectorAll('.filter-tab');
let currentFilter = 'all';

if(filterTabs) {
    filterTabs.forEach(tab => {
        tab.onclick = () => {
            document.querySelector('.filter-tab.active').classList.remove('active');
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            renderDashboard(); // Update the list based on filter
        };
    });
}