Group Information
Student 1: R.M.Ayodhya Poojani - ITBNM-2313-0056 - Role: DevOps Engineer

Student 2: Prasadika Bandara - ITBNM-2313-0006 - Role: Full Stack Developer

// Project Description

Task Manager Pro is a robust, professional-grade Task Management Application developed to optimize daily productivity. The applicatiogit n integrates a dynamic interactive calendar, real-time task filtering, and persistent data synchronization for user profiles and images using LocalStorage. Beyond its core functionality, the project showcases an industry-standard DevOps architecture, featuring a multi-branch Git strategy, automated CI/CD pipelines via GitHub Actions, and seamless cloud deployment. It bridges the gap between sophisticated frontend design and automated software delivery workflows.

// Live Deployment
🔗 Live URL: https://singular-sherbet-87d0f6.netlify.app/

// Technologies Used
**Frontend: HTML5, CSS3, JavaScript (ES6+)

**DevOps: GitHub Actions (CI/CD)

**Deployment: Netlify

**Version Control: Git with Branching Strategy

//Features
Dynamic Calendar: View and select dates to manage specific daily tasks.

Persistent Storage: User profiles (Name, Email, Photo) and Tasks remain saved even after page reloads using LocalStorage.

Professional Dark Mode: Optimized dark theme that adapts across all pages (excluding Signup).

Custom Notifications: Professional Modal-based alerts for system actions instead of browser default popups.

Security Actions: Simulated security features like App Lock and Data Protection with real-time feedback.

// Branch Strategy
We strictly followed the GitFlow branching model for this project:

main: Production-ready code only.

develop: Integration branch for features.

feature/*: Individual branches for specific feature development .

// Individual Contributions
👩‍🦰R.M.Ayodhya Poojani (DevOps Engineer)

*Initialized repository structure and branch management (main, develop).

*Configured .github/workflows/ci.yml for automated code testing.

*Implemented production deployment pipeline via GitHub Actions.

*Successfully resolved an intentional Merge Conflict between feature branches.

👩‍🦰Prasadika Bandara (Full Stack Developer)

*Developed the core Task Management logic and Dynamic Calendar.

*Implemented LocalStorage persistence for Profile Data and Images.

*Designed the responsive UI and professional Dark Mode theme.

*Integrated Custom Modal Alerts across all application modules.

// Setup Instructions
Prerequisites
*Git installed

*A modern web browser

//Installation


#. Clone the repository
git clone https://github.com/[ayodhyaranathunge]/[todo-app-deveops.].git

#. Navigate to project directory
cd [todo-app-devops]

#.Open the application
#.Since this is a static site, you can simply open index.html 
#.or use Live Server in VS Code.

// Deployment Process
Our CI/CD pipeline works as follows:

1.Continuous Integration: Every push to the develop branch triggers a CI build to verify code integrity.

2.Continuous Deployment: Merging develop into main automatically triggers a production build and deploys the latest version to the Live URL.

// Build Status
CI Pipeline: Passing

Production Deploy: Active


Real-World Problem & Solution

1. The Real-World Problem

In today's fast-paced world, people often struggle with "Information Overload" and a lack of organized structure in their daily lives. Many individuals find it difficult to balance their professional tasks with personal financial management, leading to:

* Reduced Productivity: Forgetting deadlines and failing to prioritize important tasks.

* Financial Stress: Losing track of daily expenses and failing to meet long-term savings     goals.

* Mental Clutter: The stress of manually remembering numerous small details without a centralized digital assistant.

2. How Our App Solves This Problem
Our Expense Tracker & To-Do App provides a unified digital solution to bridge the gap between task management and financial planning:

Integrated Productivity: By combining a calendar-based Task Manager with a To-Do list, users can visualize their schedule and ensure no deadline is missed.

Visual Financial Insights: Instead of just recording numbers, the app uses dynamic charts to show users exactly where their money is going, making it easier to identify and cut unnecessary costs.

Goal-Driven Savings: The Savings Planner empowers users to set specific financial targets (like buying a laptop) and provides a visual progress bar, turning abstract goals into achievable milestones.

Real-Time Collaboration & Accessibility: Built with a modern DevOps pipeline, the app ensures that user data is always synchronized and the latest features are deployed instantly for a seamless experience across all devices.

📄 Project Development – Issues & Solutions
 1.Issue: Changes Not Showing on Netlify

Problem:
Even after updating the code, the deployed website on Netlify showed the old output.

Reason:
The updated code was not pushed to the main branch, which Netlify uses for deployment.

Solution:
All changes were committed and pushed to the main branch using Git.
After pushing, Netlify automatically redeployed the site.

2.Issue: Working on the Wrong Git Branch

Problem:
Sometimes changes were made in a feature branch, but Netlify did not update.

Reason:
Netlify only tracks the main branch, not feature branches.

Solution:
Changes were merged into the main branch before pushing.
Branch status was always checked using git branch.

3.Issue: Git Push Rejected Error

Problem:
Git showed a “non-fast-forward” error when pushing changes.

Reason:
The local branch was behind the remote repository.

Solution:
The latest changes were pulled from the remote repository before pushing again.

4.Issue: Terminal Commands Not Working

Problem:
Some Git commands did not work in the terminal.

Reason:
The terminal was not opened in the correct project folder or Git Bash was not used.

Solution:
The terminal was opened inside VS Code and the correct folder was confirmed using ls or dir.

