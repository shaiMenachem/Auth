# Use an official Node.js runtime as a base image
FROM node

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY ./server/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY ./server .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app using npm
CMD ["npm", "start"]
