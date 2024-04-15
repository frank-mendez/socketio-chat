# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Make port 4000 available to the world outside this container
EXPOSE 4000

# Run the app when the container launches
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]