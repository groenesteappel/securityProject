FROM node:20.11.1-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only the package files to leverage Docker cache
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install
# Copy the rest of the project files into the docker image
COPY . .
# Install Angular CLI globally
RUN npm install -g @angular/cli

RUN npm update

# Start the application
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]