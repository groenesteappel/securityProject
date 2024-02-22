https://github.com/xothkug/securityProject


```Dockerfile 
FROM rockylinux:9

# Install Node.js 16.x
RUN dnf install -y nodejs

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
```

```Dockerfile
# Use Rocky Linux as the base image
FROM rockylinux:9

# Install Node.js and npm
RUN dnf install -y nodejs npm

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
```

Create image:
```
docker build -t security-project-app .
```

Delete image:
```
docker rmi security-project-app
```

```
docker run -it -p 172.27.52.159:4200:4200 security-project-app
```
