# Start from the official Node.js LTS base image
FROM node:16-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the Docker container
RUN npm install

# Copy the rest of the code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Install serve to serve the built application
RUN npm install -g serve

# Expose the port that the app runs on
EXPOSE 5000

# Serve the application
CMD ["serve", "-s", "dist", "-l", "5173"]