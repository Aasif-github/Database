# Use official Debian-based Node.js image to avoid manual installation issues
FROM node:18

# Set the working directory
# WORKDIR /app

# Update package lists and install dependencies
RUN apt-get update && apt-get install -y curl

# Ensure Node.js and npm are installed correctly (already included in the base image)
RUN node -v && npm -v

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
