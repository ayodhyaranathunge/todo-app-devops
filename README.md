Group Information
Student 1: R.M.Ayodhya Poojani - ITBNM-2313-0056 - Role: DevOps Engineer

Student 2: Prasadika Bandara - ITBNM-2313-0006 - Role: Full Stack Developer

// Project Description

Task Manager Pro is a robust, professional-grade Task Management Application developed to optimize daily productivity. The application integrates a dynamic interactive calendar, real-time task filtering, and persistent data synchronization for user profiles and images using LocalStorage. Beyond its core functionality, the project showcases an industry-standard DevOps architecture, featuring a multi-branch Git strategy, automated CI/CD pipelines via GitHub Actions, and seamless cloud deployment. It bridges the gap between sophisticated frontend design and automated software delivery workflows.

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