FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy project files into the docker image
COPY . .

# Start the application
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]

