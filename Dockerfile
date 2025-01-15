# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Remove package-lock.json and Node Modules
RUN rm -rf node_modules package-lock.json

# Cache Clean
RUN npm cache clean --force


# Set the working directory in the container
RUN npm install ajv ajv-keywords  --save-dev --force

# Install dependencies
RUN npm install --force

# Copy the rest of the application
COPY . .
# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]
