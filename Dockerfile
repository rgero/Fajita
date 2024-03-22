# Use the official Node.js image as a base
FROM node:alpine

# Set the working directory inside the container
WORKDIR /YouTubeQueuer

# Copy package.json and package-lock.json (if available)
COPY YouTubeQueuer/package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY YouTubeQueuer .

# Expose port 
EXPOSE 7000

# Command to run the application
CMD ["npm", "run", "dev"]
