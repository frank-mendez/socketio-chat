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

# Compile the TypeScript code to JavaScript
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]