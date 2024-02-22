FROM rockylinux:9

RUN curl -fsSL https://rpm.nodesource.com/setup_21.x | bash -

# Install Node.js 
RUN dnf install -y nodejs

RUN node --version && npm --version 

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port on which your Angular application will run
EXPOSE 4200

# Command to run the application when the container starts
CMD ["npm", "start"]
