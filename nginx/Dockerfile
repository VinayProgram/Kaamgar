# Use the official Nginx base image
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration file
# This assumes you have an `nginx.conf` file in the same directory as your Dockerfile
COPY nginx.conf /etc/nginx/conf.d/

# Copy your website's static files to the Nginx public directory
# This assumes you have an `html` directory in the same directory as your Dockerfile
# and that your nginx.conf is configured to serve from /usr/share/nginx/html
COPY html /usr/share/nginx/html

# Expose port 80, which Nginx listens on by default
EXPOSE 80

# Command to run Nginx when the container starts
# This is the default command for the nginx:alpine image,
# but it's good practice to explicitly state it if you're modifying other aspects.
CMD ["nginx", "-g", "daemon off;"]