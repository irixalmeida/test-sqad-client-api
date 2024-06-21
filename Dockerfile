# Use the official Node.js image as a base
FROM node:16

# Create and change to the app directory
WORKDIR /app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy local code to the container image
COPY . .

# Build the TypeScript code
RUN yarn build

# Expose the application on port 8080
EXPOSE 8080

# Run the web service on container startup
CMD ["node", "dist/server.js"]
