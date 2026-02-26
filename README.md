Group Information Student 1: R.M.Ayodhya Poojani - ITBNM-2313-0056 - Role: DevOps Engineer

Student 2: Prasadika Bandara - ITBNM-2313-0006 - Role: Full Stack Developer

// Project Description

Task Manager Pro is a robust, professional-grade Task Management Application developed to optimize daily productivity. The applicatiogit n integrates a dynamic interactive calendar, real-time task filtering, and persistent data synchronization for user profiles and images using LocalStorage. Beyond its core functionality, the project showcases an industry-standard DevOps architecture, featuring a multi-branch Git strategy, automated CI/CD pipelines via GitHub Actions, and seamless cloud deployment. It bridges the gap between sophisticated frontend design and automated software delivery workflows.

// Live Deployment 🔗 Live URL: https://singular-sherbet-87d0f6.netlify.app/

// Technologies Used **Frontend: HTML5, CSS3, JavaScript (ES6+)

**DevOps: GitHub Actions (CI/CD)

**Deployment: Netlify

**Version Control: Git with Branching Strategy

//Features Dynamic Calendar: View and select dates to manage specific daily tasks.

Persistent Storage: User profiles (Name, Email, Photo) and Tasks remain saved even after page reloads using LocalStorage.

Professional Dark Mode: Optimized dark theme that adapts across all pages (excluding Signup).

Custom Notifications: Professional Modal-based alerts for system actions instead of browser default popups.

Security Actions: Simulated security features like App Lock and Data Protection with real-time feedback.

// Branch Strategy We strictly followed the GitFlow branching model for this project:

main: Production-ready code only.

develop: Integration branch for features.

feature/*: Individual branches for specific feature development .

// Individual Contributions 👩‍🦰R.M.Ayodhya Poojani (DevOps Engineer)

*Initialized repository structure and branch management (main, develop).

*Configured .github/workflows/ci.yml for automated code testing.

*Implemented production deployment pipeline via GitHub Actions.

*Successfully resolved an intentional Merge Conflict between feature branches.

👩‍🦰Prasadika Bandara (Full Stack Developer)

*Developed the core Task Management logic and Dynamic Calendar.

*Implemented LocalStorage persistence for Profile Data and Images.

*Designed the responsive UI and professional Dark Mode theme.

*Integrated Custom Modal Alerts across all application modules.

// Setup Instructions Prerequisites *Git installed

*A modern web browser

//Installation

#. Clone the repository git clone https:https://github.com/ayodhyaranathunge/todo-app-devops.git

#. Navigate to project directory cd [todo-app-devops]

#.Open the application #.Since this is a static site, you can simply open index.html #.or use Live Server in VS Code.

// Deployment Process Our CI/CD pipeline works as follows:

1.Continuous Integration: Every push to the develop branch triggers a CI build to verify code integrity.

2.Continuous Deployment: Merging develop into main automatically triggers a production build and deploys the latest version to the Live URL.

// Build Status CI Pipeline: Passing

Production Deploy: Active

Real-World Problem & Solution

The Real-World Problem
In today's fast-paced world, people often struggle with "Information Overload" and a lack of organized structure in their daily lives. Many individuals find it difficult to balance their professional tasks with personal financial management, leading to:

Reduced Productivity: Forgetting deadlines and failing to prioritize important tasks.

Financial Stress: Losing track of daily expenses and failing to meet long-term savings goals.

Mental Clutter: The stress of manually remembering numerous small details without a centralized digital assistant.

How Our App Solves This Problem Our Expense Tracker & To-Do App provides a unified digital solution to bridge the gap between task management and financial planning:
Integrated Productivity: By combining a calendar-based Task Manager with a To-Do list, users can visualize their schedule and ensure no deadline is missed.

Visual Financial Insights: Instead of just recording numbers, the app uses dynamic charts to show users exactly where their money is going, making it easier to identify and cut unnecessary costs.

Goal-Driven Savings: The Savings Planner empowers users to set specific financial targets (like buying a laptop) and provides a visual progress bar, turning abstract goals into achievable milestones.

Real-Time Collaboration & Accessibility: Built with a modern DevOps pipeline, the app ensures that user data is always synchronized and the latest features are deployed instantly for a seamless experience across all devices.

📄 Project Development – Issues & Solutions 1.Issue: Changes Not Showing on Netlify

Problem: Even after updating the code, the deployed website on Netlify showed the old output.

Reason: The updated code was not pushed to the main branch, which Netlify uses for deployment.

Solution: All changes were committed and pushed to the main branch using Git. After pushing, Netlify automatically redeployed the site.

2.Issue: Working on the Wrong Git Branch

Problem: Sometimes changes were made in a feature branch, but Netlify did not update.

Reason: Netlify only tracks the main branch, not feature branches.

Solution: Changes were merged into the main branch before pushing. Branch status was always checked using git branch.

3.Issue: Git Push Rejected Error

Problem: Git showed a “non-fast-forward” error when pushing changes.

Reason: The local branch was behind the remote repository.

Solution: The latest changes were pulled from the remote repository before pushing again.

4.Issue: Terminal Commands Not Working

Problem: Some Git commands did not work in the terminal.

Reason: The terminal was not opened in the correct project folder or Git Bash was not used.

Solution: The terminal was opened inside VS Code and the correct folder was confirmed using ls or dir.


**To-Do Application with Docker Containerization**

* Project Overview

This project involves containerizing a frontend To-Do application using Docker as part of the DevOps Assignment 2. The implementation focuses on ensuring environment consistency, security best practices (non-root execution), and performance optimization through lightweight Alpine-based images.


* Prerequisites

Before running this application, ensure have the following installed:

1.Docker Desktop: https://www.docker.com/products/docker-desktop/
2.Git: https://git-scm.com/install/ (For repository cloning and version control )


* Technical Architecture

1.Base Image: nginxinc/nginx-unprivileged:1.25-alpine (Selected for its minimal size and non-root security profile) 
2.Orchestration: Docker Compose (defines services, networks, and health checks) 
3.Networking: Custom isolated bridge network (todo-app-network) 
4.Security: Runs as a non-root user (UID 101) to follow the principle of least privilege 


* Getting Started (Build and Run)
Follow these steps to build and run the containerized application using a single command:

**1. Clone the Repository:**

//command//
    git clone https://github.com/ayodhyaranathunge/todo-app-devops.git
    cd todo-app-devops

**2. Build and Start the Containers:**

//command//

docker-compose up -d --build


**3. Verify Installation:**
Check if the container is running and healthy:
docker ps
Note: Wait for the status to show (healthy) (approximately 30 seconds).

**4. Access the App:**

Open  browser and go to:
 http://localhost:8080

##  Configuration
The following environment variables and configurations are used:
* **Port Mapping:** The application is exposed on host port "8080".
* **Health Check:** Polling every 30s to ensure the Nginx server is responding
* **.dockerignore:** Implemented to exclude node_modules, .git, and documentation files to optimize build context size

##  Stopping the Application
To stop the services and remove the custom network:

docker-compose down

**Group Contributions**

1.R.M.Ayodhya Poojani-ITBNM-2313-0056(Devops engineer): Dockerfile creation, Container optimization, and Security implementation.

2.Prasadika Bandara-ITBNM-2313-0006(Full stack developer): Docker Compose orchestration, Networking, and README documentation.

**Technical Implementation by Member 1**
As the Group Leader, Member 1 focused on creating a high-performance, secure, and optimized Docker image, ensuring the application follows industry-standard containerization patterns.

1. Dockerfile Development & Layer Optimization
Developed a production-ready Dockerfile designed for efficiency and speed.

#.Base Image Selection: Utilized nginxinc/nginx-unprivileged:1.25-alpine to minimize the image footprint and reduce the attack surface.

#.Layer Caching: Strategically ordered Dockerfile instructions (e.g., placing static file copies after dependency configurations) to maximize build cache efficiency and reduce subsequent build times.

#.Multi-Stage Build (Planned): Structured the build process to separate the development environment from the final production-ready artifact, ensuring no unnecessary build tools are included in the final image.

2. Advanced Container Optimization
Applied several techniques to optimize the container for performance and resource management:

#.Minimal Footprint: By using the Alpine-based distribution, the final image size was reduced significantly compared to standard Linux distributions.

#.Build Context Control: Collaborated on defining the .dockerignore file to ensure only essential source files are sent to the Docker daemon, improving build performance.

#.Dependency Management: Streamlined the installation of application components to ensure that the container remains lightweight and performant.

3. Security Implementation (Hardening)
#.Security was a primary focus, implementing the principle of least privilege throughout the container lifecycle:

#.Non-Root Execution: Configured the container to run under a non-privileged user (UID 101) instead of the default root user. This prevents potential container breakout attacks from gaining host-level administrative access.

#.Attack Surface Reduction: Removed all non-essential shell utilities and packages from the production image to minimize potential vulnerabilities.

#.Secret Management: Ensured that no sensitive credentials or environment-specific configurations are hardcoded within the Dockerfile, utilizing environment variables for secure externalization.

**Technical Implementation by Member 2**
Member 2 was responsible for the orchestration, networking, and documentation phases of the project, ensuring the application is scalable, highly available, and securely networked.

1. Docker Compose Orchestration
#. Designed the docker-compose.yml file to manage the application lifecycle, enabling the entire stack to be deployed with a single command. This ensures environment consistency across different development, testing, and production setups.

#.Service Definition: Configured the todo-app service with appropriate build contexts and externalized configurations using environment variables.

#.Automation: Streamlined the deployment process by integrating the Dockerfile with Compose for seamless orchestration.

#.Health Monitoring: Implemented automated health checks (polling the Nginx server every 30 seconds) to ensure container reliability and automatic recovery in case of failures.

2. Advanced Container Networking & Security
Implemented a robust networking strategy to enhance isolation and minimize the application's attack surface:

#.User-Defined Bridge Network: Created an isolated internal network named todo-app-network. By avoiding the "Default Bridge," we ensure that only explicitly defined services can communicate, preventing unauthorized lateral movement between containers.

#.Port Exposure & Mapping: Configured secure port forwarding by mapping Host Port 8080 to Container Port 8080. This restricts access to the Nginx server while maintaining internal service isolation.

#.Network Isolation: This approach follows the principle of least privilege, ensuring that the containerized environment exposes only the minimum necessary services to the host machine.


3. Scalability & Future-Proofing
The current architecture is designed for future scalability:

#.Multi-Service Readiness: The Docker Compose configuration allows for the easy integration of additional services, such as a database (e.g., PostgreSQL or MongoDB) or a backend API, by simply defining them within the existing todo-app-network.

#.Resource Management: The orchestration setup is prepared for resource limits (CPU and memory constraints) to prevent resource contention as the application grows.

4. Documentation & Quality Assurance

#.Technical Documentation: Authored a professional README.md providing comprehensive prerequisites, build/run commands, and configuration options for end-users.

#.Optimized Build Context: Configured a .dockerignore file to exclude unnecessary files (like node_modules and .git), reducing image size and preventing sensitive data leakage.

