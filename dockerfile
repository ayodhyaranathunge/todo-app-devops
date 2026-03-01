# Base Image Selection
# We use nginx-unprivileged:alpine instead of the standard nginx image.
# Justification: 
# 1. Alpine Linux keeps the image size minimal (reducing attack surface).
# 2. 'unprivileged' runs the container as a non-root user (UID 101) by default, 
#    adhering to the Principle of Least Privilege for enhanced security.

FROM nginxinc/nginx-unprivileged:1.25-alpine

# Set the working directory to Nginx's default HTML serving directory
WORKDIR /usr/share/nginx/html


# Dependency Management & Layering
# Copy only the necessary source code files to the web server directory.
# Since this is a static HTML/JS/CSS application without a build step (like Node),
# a multi-stage build is not required and a single-stage copy is optimal.

COPY . .

# Expose port 8080 (Non-root users cannot bind to ports below 1024 like port 80)
EXPOSE 8080

# Health Check Implementation
# Ensures the container is actually serving traffic, not just running the process.

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]