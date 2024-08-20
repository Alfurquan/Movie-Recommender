# Use the official Node.js image as a parent image
FROM node:20.15.1

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install @rollup/rollup-linux-x64-gnu

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the app
CMD ["npm", "run", "dev"]