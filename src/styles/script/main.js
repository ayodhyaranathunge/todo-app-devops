
// 1. Global Variables & Initial Data

let selectedDate = new Date();
let currentViewDate = new Date();
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let currentFilter = 'all'; 


//2.Calendar Logic (Tasks Page)

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


// 3. Task Management (Add, Toggle, Delete, Render)

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

function setupFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.onclick = function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderTasks();
        };
    });
}

function renderTasks() {
    const list = document.getElementById('todo-list');
    if (!list) return;
    list.innerHTML = '';
    
    let dailyTasks = tasks.filter(t => new Date(t.timestamp).toDateString() === selectedDate.toDateString());

    if (currentFilter === 'active') {
        dailyTasks = dailyTasks.filter(t => !t.done);
    } else if (currentFilter === 'done') {
        dailyTasks = dailyTasks.filter(t => t.done);
    }

    if (dailyTasks.length === 0) {
        list.innerHTML = `<p style="text-align:center; color:#888; font-size:12px; margin-top:20px;">No ${currentFilter} tasks for this day.</p>`;
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


// 4. Home UI & Side Menu

function updateHomeUI() {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    if (profile && document.getElementById('homeUserName')) {
        document.getElementById('homeUserName').innerText = `Hello, ${profile.name}!`;
    }

    // Showing the image on the home page
    const homeImg = document.getElementById('homeProfileImg');
    const savedImg = localStorage.getItem('profileImage');
    if (homeImg && savedImg) homeImg.src = savedImg;

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


// 5. Settings, Profile Data & Dark Mode

// The function that returns data to the Settings page was updated
function loadSettingsData() {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    const savedImg = localStorage.getItem('profileImage'); 
    // Retrieving a saved picture

    if (savedProfile) {
        if (document.getElementById('setUserName')) 
            document.getElementById('setUserName').innerText = savedProfile.name;
        if (document.getElementById('setUserEmail')) 
            document.getElementById('setUserEmail').innerText = savedProfile.email;
        
        if (document.getElementById('userNameInput')) document.getElementById('userNameInput').value = savedProfile.name;
        if (document.getElementById('userEmailInput')) document.getElementById('userEmailInput').value = savedProfile.email;
    }

    //Showing the image on the Settings page  
    const setImgEl = document.getElementById('setProfileImg');
    if (setImgEl && savedImg) {
        setImgEl.src = savedImg;
    }
}

// The process of saving a profile photo when it is selected
function setupImageUpload() {
    const imgInput = document.getElementById('imgInput');
    if (imgInput) {
        imgInput.onchange = function(e) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = function() {
                const preview = document.getElementById('profilePreview');
                const plusIcon = document.getElementById('plusIcon');
                if (preview) {
                    preview.src = reader.result;
                    preview.style.display = 'block';
                    if (plusIcon) plusIcon.style.display = 'none';
                }
                localStorage.setItem('profileImage', reader.result);
                updateHomeUI(); 
                // To update he home page
            }

            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }
}

// Loading a saved image
function loadProfileImage() {
    const savedImg = localStorage.getItem('profileImage');
    const preview = document.getElementById('profilePreview');
    const plusIcon = document.getElementById('plusIcon');
    
    if (savedImg && preview) {
        preview.src = savedImg;
        preview.style.display = 'block';
        if (plusIcon) plusIcon.style.display = 'none';
    }
}

window.saveUserProfile = (event) => {
    if(event) event.preventDefault();
    
    const name = document.getElementById('userNameInput').value;
    const email = document.getElementById('userEmailInput').value;

    if (!name || !email) {
        alert("Please fill in all fields");
        return;
    }

    const profile = { name, email };
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    updateHomeUI();
    showCustomAlert("Profile Updated Successfully!", "index.html"); 
};

window.toggleDarkMode = () => {
    const appFrame = document.getElementById('app-frame');
    if (!appFrame) return;
    const isDark = appFrame.classList.toggle('dark-theme');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
};


// 6. Notifications Logic

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
                    <div class="notif-actions">
                        <span class="action-link" onclick="location.href='task.html?id=${task.id}'">View Details</span>
                    </div>
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


// 7. Security Page Buttons (Updated with Custom Alert)

function setupSecurityButtons() {
    const securityButtons = document.querySelectorAll('.sec-action-btn');
    securityButtons.forEach(button => {
        button.onclick = function() {
            const action = this.innerText; 
            showCustomAlert(`${action} process has been started successfully!`);
            
            this.style.opacity = '0.5';
            const originalText = this.innerText;
            this.innerText = "Processing...";
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.innerText = originalText;
            }, 1500);
        };
    });
}


// 8. Custom Modal Alert Logic

function showCustomAlert(message, redirectUrl = null) {
    const modal = document.getElementById('customAlert');
    if (!modal) return;
    document.getElementById('alertMessage').innerText = message;
    modal.style.display = 'flex';
    window.pendingRedirect = redirectUrl;
}

function closeAlert() {
    const modal = document.getElementById('customAlert');
    if (modal) modal.style.display = 'none';
    if (window.pendingRedirect) {
        window.location.href = window.pendingRedirect;
    }
}


// 9. Initialization (DOMContentLoaded) - UPDATED

document.addEventListener('DOMContentLoaded', () => {
    const darkModeStatus = localStorage.getItem('darkMode');
    const appFrame = document.getElementById('app-frame');
    const toggleSwitch = document.getElementById('darkModeToggle');

    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage !== "Signup.html" && currentPage !== "signup.html") {
        if (darkModeStatus === 'enabled' && appFrame) {
            appFrame.classList.add('dark-theme');
            if (toggleSwitch) toggleSwitch.checked = true;
        }
    } else {
        if (appFrame) appFrame.classList.remove('dark-theme');
    }

    setupFilters(); 
    renderCalendar();
    renderTasks();
    updateHomeUI();
    loadSettingsData();
    renderNotifications();
    setupImageUpload(); // Enabling the ability to upload images
    loadProfileImage(); // Displaying the saved image

    if (document.querySelectorAll('.sec-action-btn').length > 0) {
        setupSecurityButtons();
    }

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

function processLogout() {
    if(confirm("Are you sure you want to logout? This will clear your data.")) {
        localStorage.clear(); 
        sessionStorage.clear();
        alert("Logged out and data cleared!");
        window.location.href = "Signup.html";
    }
}