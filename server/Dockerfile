# Use an official Node.js image with Python installed
FROM node:18-bullseye

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Copy package.json and requirements.txt
COPY package.json ./
COPY requirements.txt ./

# Install Node.js dependencies
RUN npm install

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the server code
COPY . .

# Expose port 8000 for Cloud Run
EXPOSE 8000

# Set environment variable for port
ENV PORT=8000

# Start the Node.js server
CMD ["node", "server.js"]
