# Start from the official Node.js LTS base image
FROM node:18-alpine AS build

# Set the working directory in the Docker container
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies in the Docker container
RUN npm install

# Copy the rest of the code to the working directory
COPY . .

# Compile the TypeScript code to JavaScript
RUN npm run build --if-present

# Start from the official Node.js LTS base image
FROM node:18-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy the compiled JavaScript code to the working directory
COPY --from=build /usr/src/app/dist ./dist

# Install only production dependencies
COPY package*.json ./

RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["node", "dist/main.js"]