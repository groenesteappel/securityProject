# Use an official Node runtime as a parent image
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Install global packages
RUN npm install -g nodemon

# Install local packages
COPY package*.json ./
RUN npm install

# Copy the rest of your application's code
COPY . .

# Expose port 3000 to the outside once the container is running
EXPOSE 3000

# Define the command to run your app using nodemon
CMD ["nodemon", "./src/app.js"]
