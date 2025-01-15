# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application for production
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
