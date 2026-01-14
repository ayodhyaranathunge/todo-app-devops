# todo-app-devops
Advanced Git &amp; Devops Assignment - Todo App

Task Management Web Application 
A fully responsive, mobile-first Task Management web application designed to help users organize their daily routines, track progress, and manage tasks efficiently. This project features a clean Pinterest-inspired UI with advanced functionalities like local storage persistence and a global dark mode.

✨ Key Features
User Profile Management: Personalized dashboard with dynamic user greetings and profile editing capabilities.

Interactive Calendar: A custom-built calendar view to organize and view tasks based on specific dates.

Advanced Task Operations: Full CRUD (Create, Read, Update, Delete) support for tasks with completion toggling.

Progress Tracking: Visual progress bar on the home screen that calculates completion percentage in real-time.

Global Dark Mode: Persistent dark theme that can be toggled via settings, affecting the entire application frame.

Smart Notifications: Automated reminders for missed tasks, upcoming deadlines, and task additions.

Fully Responsive Design: Mobile-frame architecture ensuring a consistent experience across different screen sizes.

✨ Tech Stack
HTML5: Semantic structure for accessibility and SEO.

CSS3: Custom styling using Flexbox, CSS Grid, and animations for a modern UI.

JavaScript (ES6+): Core logic for task handling, calendar rendering, and theme management.

LocalStorage: Used for client-side data persistence (Tasks, Profile, and Theme settings).

✨Project Structure
Plaintext

/
├── index.html           # Home Dashboard
├── task.html            # Task Management & Calendar
├── profile.html         # Edit Profile Page
├── setting.html         # Settings & Theme Toggle
├── notification.html    # Alerts & Notifications
├── security.html        # Security Settings
├── logout.html          # Logout Confirmation
└── src/
    └── styles/
        ├── style.css    # Global Styles & Dark Theme
        └── script/
            └── main.js  # Application Logic
Getting Started
Clone the Repository:

Bash

git clone https://github.com/your-username/task-manager-app.git
Run the App: Simply open index.html in any modern web browser.

Data Persistence: Your tasks and settings will remain saved even after refreshing or closing the browser thanks to LocalStorage.

✨ Verification Checklist
#. All pages are linked correctly.

#. Dark Mode persists across page navigation.

#. Task progress updates dynamically.

#. Responsive mobile-frame UI.
