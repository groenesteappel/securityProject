# Use Rocky Linux as the base image
FROM rockylinux:9

# Install Node.js and npm
RUN curl -fsSL https://rpm.nodesource.com/setup_21.x | bash -

RUN dnf install -y nodejs

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port on which your Node.js application will run
EXPOSE 3000

# Command to run the application when the container starts
CMD ["npm", "start"]
