// ==========================================
// 1. Global Variables & Initial Data
// ==========================================
let selectedDate = new Date();
let currentViewDate = new Date();
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// ==========================================
// 2. Calendar Logic (Tasks Page)
// ==========================================
function renderCalendar() {
    const daysContainer = document.getElementById('calendar-days');
    const display = document.getElementById('month-year-display');
    if (!daysContainer || !display) return;

    display.innerText = currentViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    daysContainer.innerHTML = '';

    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const gap = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    for (let x = 0; x < gap; x++) {
        const gapDiv = document.createElement('div');
        gapDiv.className = "day-node other-month";
        daysContainer.appendChild(gapDiv);
    }

    for (let d = 1; d <= lastDate; d++) {
        const dateObj = new Date(year, month, d);
        const isToday = new Date().toDateString() === dateObj.toDateString();
        const isSelected = selectedDate.toDateString() === dateObj.toDateString();
        
        const dayDiv = document.createElement('div');
        dayDiv.className = `day-node ${isToday ? 'today-mark' : ''} ${isSelected ? 'active-day' : ''}`;
        dayDiv.innerText = d;
        dayDiv.onclick = () => {
            selectedDate = dateObj;
            const pickedDateEl = document.getElementById('picked-date');
            if (pickedDateEl) pickedDateEl.innerText = selectedDate.toLocaleDateString('en-GB');
            renderCalendar();
            renderTasks();
        };
        daysContainer.appendChild(dayDiv);
    }
}

// Calendar Navigation
if (document.getElementById('prev-month')) {
    document.getElementById('prev-month').onclick = () => { 
        currentViewDate.setMonth(currentViewDate.getMonth() - 1); 
        renderCalendar(); 
    };
    document.getElementById('next-month').onclick = () => { 
        currentViewDate.setMonth(currentViewDate.getMonth() + 1); 
        renderCalendar(); 
    };
}

// ==========================================
// 3. Task Management (Add, Toggle, Delete)
// ==========================================
function saveTask() {
    const input = document.getElementById('todo-input');
    if (!input || input.value.trim() === "") return;

    const newTask = {
        id: Date.now(),
        text: input.value.trim(),
        timestamp: selectedDate.getTime(),
        done: false
    };

    tasks.push(newTask);
    updateStorageAndUI();
    input.value = ""; 
}

if (document.getElementById('add-btn')) {
    document.getElementById('add-btn').onclick = saveTask;
}

window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    updateStorageAndUI();
};

window.deleteTask = (id) => {
    if(confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(t => t.id !== id);
        updateStorageAndUI();
    }
};

function renderTasks() {
    const list = document.getElementById('todo-list');
    if (!list) return;
    list.innerHTML = '';

    const dailyTasks = tasks.filter(t => new Date(t.timestamp).toDateString() === selectedDate.toDateString());

    if (dailyTasks.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#888; font-size:12px; margin-top:20px;">No tasks for this day.</p>';
        return;
    }

    dailyTasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-row-v2 ${task.done ? 'done' : ''}`;
        div.setAttribute('data-id', task.id);
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 onclick="toggleTask(${task.id})" style="cursor:pointer; flex:1;">${task.text}</h4>
                <span onclick="deleteTask(${task.id})" style="color:#ff7675; cursor:pointer; font-weight:bold; margin-left:10px;">✕</span>
            </div>
            <div class="task-date-stamp">📅 Set for: ${new Date(task.timestamp).toLocaleDateString('en-GB')}</div>
        `;
        list.appendChild(div);
    });
}

function updateStorageAndUI() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
    if (document.getElementById('homeUserName')) updateHomeUI();
}

// ==========================================
// 4. Home UI & Side Menu
// ==========================================
function updateHomeUI() {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    if (profile && document.getElementById('homeUserName')) {
        document.getElementById('homeUserName').innerText = `Hello, ${profile.name}!`;
    }

    const todayStr = new Date().toDateString();
    const todayTasks = tasks.filter(t => new Date(t.timestamp).toDateString() === todayStr);
    const pending = todayTasks.filter(t => !t.done).length;
    const completed = tasks.filter(t => t.done).length;

    if (document.getElementById('pendingCount')) 
        document.getElementById('pendingCount').innerText = pending;

    if (tasks.length > 0) {
        const percent = Math.round((completed / tasks.length) * 100);
        const bar = document.getElementById('mainProgressBar');
        if (bar) bar.style.width = percent + '%';
        if (document.getElementById('progressText')) 
            document.getElementById('progressText').innerText = `${percent}% Completed`;
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// ==========================================
// 5. Settings & Dark Mode (RECORRECTED)
// ==========================================
function loadSettingsData() {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (savedProfile) {
        if (document.getElementById('setUserName')) document.getElementById('setUserName').innerText = savedProfile.name;
        if (document.getElementById('setUserEmail')) document.getElementById('setUserEmail').innerText = savedProfile.email;
    }
}

window.toggleDarkMode = () => {
    const appFrame = document.getElementById('app-frame');
    if (!appFrame) return;

    // පන්තිය ඇත්නම් ඉවත් කරයි, නැත්නම් එකතු කරයි
    const isDark = appFrame.classList.toggle('dark-theme');
    
    // තත්ත්වය localStorage හි සුරැකීම
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
};
// ==========================================
// 6. Notifications Logic
// ==========================================
function renderNotifications() {
    const notifContainer = document.getElementById('notif-container');
    if (!notifContainer) return;
    notifContainer.innerHTML = '';

    if (tasks.length === 0) {
        notifContainer.innerHTML = '<div style="text-align:center; margin-top:50px;"><span style="font-size:50px;">📭</span><p style="color:#888;">No notifications yet.</p></div>';
        return;
    }

    const today = new Date().setHours(0,0,0,0);
    [...tasks].reverse().forEach(task => {
        let type = "New Task", icon = "📌", colorClass = "blue-bg", message = `Task "<strong>${task.text}</strong>" added.`;
        const taskDate = new Date(task.timestamp).setHours(0,0,0,0);

        if (taskDate < today && !task.done) {
            type = "Missed!"; icon = "⚠️"; colorClass = "pink-bg";
            message = `Missed deadline for "<strong>${task.text}</strong>"!`;
        } else if (task.done) {
            type = "Completed"; icon = "✅"; colorClass = "green-bg";
            message = `Finished "<strong>${task.text}</strong>".`;
        } else if (taskDate === today) {
            type = "Reminder"; icon = "⏰"; colorClass = "pink-bg";
            message = `Deadline is today for "<strong>${task.text}</strong>".`;
        }

        const timeAgo = calculateTimeAgo(task.id);
        notifContainer.innerHTML += `
            <div class="notif-card">
                <div class="notif-icon-box ${colorClass}">${icon}</div>
                <div class="notif-body">
                    <div class="notif-title-row"><h4>${type}</h4><small>${timeAgo}</small></div>
                    <p>${message}</p>
                    <div class="notif-actions"><span class="action-link" onclick="location.href='tasks.html?id=${task.id}'">View Details</span></div>
                </div>
            </div>`;
    });
}

function calculateTimeAgo(ts) {
    const sec = Math.floor((Date.now() - ts) / 1000);
    if (sec < 60) return 'Just now';
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    return `${Math.floor(hr / 24)}d ago`;
}

// ==========================================
// 7. Security Page Buttons
// ==========================================
function setupSecurityButtons() {
    const securityButtons = document.querySelectorAll('.sec-action-btn');
    securityButtons.forEach(button => {
        button.onclick = function() {
            const action = this.innerText;
            alert(`${action} feature is being activated...`);
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
                alert(`${action} has been successfully updated.`);
            }, 1000);
        };
    });
}

// ==========================================
// 8. Initialization (DOMContentLoaded) - RECORRECTED
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Persistence Check
    const darkModeStatus = localStorage.getItem('darkMode');
    const appFrame = document.getElementById('app-frame');
    const toggleSwitch = document.getElementById('darkModeToggle');

    if (darkModeStatus === 'enabled' && appFrame) {
        appFrame.classList.add('dark-theme');
        if (toggleSwitch) {
            toggleSwitch.checked = true;
        }
    }

    // 2. Data Rendering
    renderCalendar();
    renderTasks();
    updateHomeUI();
    loadSettingsData();
    renderNotifications();

    // 3. Security Check
    if (document.querySelector('.security-screen')) setupSecurityButtons();

    // 4. URL Task Highlight
    const taskId = new URLSearchParams(window.location.search).get('id');
    if (taskId) {
        setTimeout(() => {
            const el = document.querySelector(`[data-id="${taskId}"]`);
            if (el) {
                el.style.border = "2px solid #3c40c6";
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    }
});