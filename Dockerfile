# Use the official Node.js image as a base
FROM node:alpine AS build

# Set the working directory inside the container
WORKDIR /Nacho

# Copy package.json and package-lock.json (if available)
COPY Nacho/package*.json ./

# Copy the .env file
COPY .env ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY Nacho ./

# Build the React app
RUN npm run build

# Use an Nginx image to serve the build files
FROM nginx:alpine

# Copy the build files from the previous step
COPY --from=build /Nacho/dist /usr/share/nginx/nacho

# Copy the custom Nginx configuration file
COPY server/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 7000
EXPOSE 7000

# Start Nginx with the custom configuration
CMD ["nginx", "-g", "daemon off;"]