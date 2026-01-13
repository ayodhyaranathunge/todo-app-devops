// --- Global Data Storage ---
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let currentViewDate = new Date(); // Calendar එකේ පෙන්වන මාසය
let selectedDate = new Date();    // User තෝරාගත් දිනය

// ==========================================
// 1. Calendar Logic (Tasks Page එක සඳහා)
// ==========================================
function renderCalendar() {
    const daysContainer = document.getElementById('calendar-days');
    const display = document.getElementById('month-year-display');
    if (!daysContainer) return;

    display.innerText = currentViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    daysContainer.innerHTML = '';

    const firstDayIndex = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), 1).getDay();
    const lastDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 0).getDate();

    const gap = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    for (let x = 0; x < gap; x++) {
        daysContainer.innerHTML += `<div class="day-node other-month"></div>`;
    }

    for (let d = 1; d <= lastDate; d++) {
        const dateObj = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), d);
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

// Calendar Month Navigation
if (document.getElementById('prev-month')) {
    document.getElementById('prev-month').onclick = () => { currentViewDate.setMonth(currentViewDate.getMonth() - 1); renderCalendar(); };
    document.getElementById('next-month').onclick = () => { currentViewDate.setMonth(currentViewDate.getMonth() + 1); renderCalendar(); };
}

// ==========================================
// 2. Task Page Rendering & Logic
// ==========================================
function renderTasks() {
    const list = document.getElementById('todo-list');
    if (!list) return;
    list.innerHTML = '';

    const dailyTasks = tasks.filter(t => new Date(t.timestamp).toDateString() === selectedDate.toDateString());

    dailyTasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-row-v2 ${task.done ? 'done' : ''}`; // Done නම් style එක එකතු වේ
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h4 onclick="toggleTask(${task.id})" style="cursor:pointer; flex:1;">${task.text}</h4>
                <span onclick="deleteTask(${task.id})" style="color:#ff7675; cursor:pointer; font-weight:bold; margin-left:10px;">✕</span>
            </div>
            <div class="task-date-stamp">📅 Set for: ${new Date(task.timestamp).toLocaleDateString('en-GB')}</div>
        `;
        list.appendChild(div);
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    renderTasks();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
};

// ==========================================
// 3. Side Menu & Global Features (සියලුම පිටුවලට)
// ==========================================
const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('menu-overlay');

if (menuBtn && sideMenu && overlay) {
    menuBtn.onclick = () => { sideMenu.classList.add('active'); overlay.classList.add('active'); };
    overlay.onclick = () => { sideMenu.classList.remove('active'); overlay.classList.remove('active'); };
}

// Settings Toggle
const darkSwitch = document.getElementById('dark-mode-switch');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    if (darkSwitch) darkSwitch.classList.add('active');
}

if (darkSwitch) {
    darkSwitch.onclick = () => {
        darkSwitch.classList.toggle('active');
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    };
}

// ==========================================
// 4. Initializers (Page Load එකේදී)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    renderTasks();
    
    const addBtn = document.getElementById('add-btn');
    const input = document.getElementById('todo-input');
    if (addBtn && input) {
        addBtn.onclick = () => {
            if (input.value.trim()) {
                tasks.push({ id: Date.now(), text: input.value, done: false, timestamp: selectedDate.getTime() });
                input.value = '';
                renderTasks();
            }
        };
    }
});

//profile page

// Profile Image Handling
const imgInput = document.getElementById('imgInput');
if (imgInput) {
    imgInput.onchange = function(e) {
        const reader = new FileReader();
        reader.onload = function() {
            localStorage.setItem('userPhoto', reader.result);
            document.getElementById('profilePreview').src = reader.result;
            document.getElementById('profilePreview').style.display = 'block';
            document.getElementById('plusIcon').style.display = 'none';
        }
        reader.readAsDataURL(e.target.files[0]);
    };
}

// Save Profile Data
function saveUserProfile() {
    const userData = {
        name: document.getElementById('editName').value || "Amy Young",
        dept: document.getElementById('editDept').value,
        phone: document.getElementById('editPhone').value || "+98 1245560090",
        email: document.getElementById('editEmail').value || "amyyoung@random.com"
    };
    localStorage.setItem('userProfile', JSON.stringify(userData));
    alert("Profile Updated!");
    location.href = 'profile.html';
}

// Load Profile Data (Profile Page එකට ගිය විට)
window.onload = function() {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    const savedPhoto = localStorage.getItem('userPhoto');

    if (savedProfile && document.getElementById('profileName')) {
        document.getElementById('profileName').innerText = savedProfile.name;
        document.getElementById('profileDept').innerText = savedProfile.dept;
        document.getElementById('profilePhone').innerText = savedProfile.phone;
        document.getElementById('profileEmail').innerText = savedProfile.email;
    }
    
    if (savedPhoto && document.querySelector('.profile-avatar-placeholder')) {
        const placeholder = document.querySelector('.profile-avatar-placeholder');
        placeholder.innerHTML = `<img src="${savedPhoto}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
        placeholder.style.background = 'transparent';
    }
};
//logout

function processLogout() {
    // අවශ්‍ය නම් මෙහිදී session දත්ත clear කළ හැක
    alert("Logging out...");
    location.href = 'login.html'; // කෙළින්ම login පිටුවට යැවීම
}

//notifications

/**
 * Notifications පෙන්වීමේ ප්‍රධාන logic එක
 * මෙය Tasks වල තත්ත්වය (Status) පරීක්ෂා කර ස්වයංක්‍රීයව Notifications සාදයි.
 */
function renderNotifications() {
    const notifContainer = document.getElementById('notif-container');
    if (!notifContainer) return;

    notifContainer.innerHTML = '';
    // localStorage එකෙන් tasks ලබා ගැනීම
    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

    // කිසිදු task එකක් නොමැති විට පෙන්වන පණිවිඩය
    if (tasks.length === 0) {
        notifContainer.innerHTML = `
            <div style="text-align:center; margin-top:50px;">
                <span style="font-size:50px;">📭</span>
                <p style="color:#888;">No notifications yet.</p>
            </div>`;
        return;
    }

    // වර්තමාන දිනය පරීක්ෂා කිරීම සඳහා (Time zeroed)
    const today = new Date().setHours(0, 0, 0, 0);

    // අලුත්ම දේ උඩින් පෙන්වීමට reverse කිරීම
    const reversedTasks = [...tasks].reverse();

    reversedTasks.forEach(task => {
        let type = "New Task"; 
        let icon = "📌";
        let colorClass = "blue-bg";
        let message = `Your task "<strong>${task.text}</strong>" is pending in your list.`;

        // Task එකක දිනය (Date/Timestamp) ලබා ගැනීම
        const taskDate = new Date(task.timestamp || task.date).setHours(0, 0, 0, 0);

        // 1. Task එක Missed වී ඇත්දැයි පරීක්ෂා කිරීම (දිනය ඉකුත් වූ නමුත් නිම කර නැති)
        if (taskDate < today && !task.done) {
            type = "Missed!";
            icon = "⚠️";
            colorClass = "pink-bg";
            message = `You missed the deadline for "<strong>${task.text}</strong>"!`;
        } 
        // 2. Task එක නිම කර ඇත්දැයි පරීක්ෂා කිරීම
        else if (task.done) {
            type = "Completed";
            icon = "✅";
            colorClass = "green-bg";
            message = `Great job! You successfully finished "<strong>${task.text}</strong>".`;
        }
        // 3. අද දිනට නියමිත Task එකක් දැයි පරීක්ෂා කිරීම (Reminder)
        else if (taskDate === today) {
            type = "Reminder";
            icon = "⏰";
            colorClass = "pink-bg";
            message = `Deadline is today for "<strong>${task.text}</strong>". Start now!`;
        }

        const timeAgo = calculateTimeAgo(task.id);
        
        const notifCard = document.createElement('div');
        notifCard.className = 'notif-card';
        notifCard.innerHTML = `
            <div class="notif-icon-box ${colorClass}">${icon}</div>
            <div class="notif-body">
                <div class="notif-title-row">
                    <h4>${type}</h4>
                    <small>${timeAgo}</small>
                </div>
                <p>${message}</p>
                <div class="notif-actions">
                    <span class="action-link" onclick="location.href='tasks.html'">View Details</span>
                </div>
            </div>
        `;
        notifContainer.appendChild(notifCard);
    });
}

/**
 * Task එකක් සාදා කොපමණ වේලාවක් ගතවී ඇත්දැයි ගණනය කිරීම
 * @param {number} timestamp - Task ID (Date.now())
 */
function calculateTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

// පිටුව Load වන විට හෝ Task Page එකෙන් පැමිණෙන විට render කිරීම
document.addEventListener('DOMContentLoaded', renderNotifications);

//notification connect with java page

// Notifications පෙන්වීමේ logic එක
function renderNotifications() {
    const notifContainer = document.getElementById('notif-container');
    if (!notifContainer) return;

    notifContainer.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

    if (tasks.length === 0) {
        notifContainer.innerHTML = `
            <div style="text-align:center; margin-top:50px;">
                <span style="font-size:50px;">📭</span>
                <p style="color:#888;">No notifications yet.</p>
            </div>`;
        return;
    }

    const today = new Date().setHours(0,0,0,0);

    tasks.reverse().forEach(task => {
        let type = "New Task"; 
        let icon = "📌";
        let colorClass = "blue-bg";
        let message = `You added a new task: "<strong>${task.text}</strong>"`;

        const taskDate = new Date(task.date).setHours(0,0,0,0);
        
        // Task එක miss වුණාද, complete ද කියලා බලන කොටස
        if (taskDate < today && !task.done) {
            type = "Missed!"; icon = "⚠️"; colorClass = "pink-bg";
            message = `You missed the deadline for "<strong>${task.text}</strong>"!`;
        } else if (task.done) {
            type = "Completed"; icon = "✅"; colorClass = "green-bg";
            message = `Great job! You completed "<strong>${task.text}</strong>".`;
        } else if (taskDate === today) {
            type = "Reminder"; icon = "⏰"; colorClass = "pink-bg";
            message = `Deadline is today for "<strong>${task.text}</strong>".`;
        }

        const timeAgo = calculateTimeAgo(task.id);
        const card = document.createElement('div');
        card.className = 'notif-card';
        // URL එකේ id එකත් එක්ක View Details වලට link කරන කොටස
        card.innerHTML = `
            <div class="notif-icon-box ${colorClass}">${icon}</div>
            <div class="notif-body">
                <div class="notif-title-row">
                    <h4>${type}</h4>
                    <small>${timeAgo}</small>
                </div>
                <p>${message}</p>
                <div class="notif-actions">
                    <span class="action-link" onclick="location.href='tasks.html?id=${task.id}'">View Details</span>
                </div>
            </div>`;
        notifContainer.appendChild(card);
    });
}

//task page highliht

// URL එකේ ID එකක් තිබේ නම් අදාළ Task එක Highlight කිරීම
function highlightTaskFromURL() {
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get('id');

    if (taskId) {
        // Task එක පෙන්වන තුරු කුඩා වෙලාවක් රැඳී සිටීම (Render වන තෙක්)
        setTimeout(() => {
            const taskElement = document.querySelector(`[data-id="${taskId}"]`);
            if (taskElement) {
                taskElement.style.border = "2px solid #3c40c6";
                taskElement.style.backgroundColor = "#e3f2fd";
                taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    }
}

// පිටුව Load වන විට මේ දෙකම වැඩ කළ යුතුයි
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('notif-container')) renderNotifications();
    if (document.getElementById('todo-list')) highlightTaskFromURL();
});
