# Use an official Node runtime as a parent image
FROM node:20.2.0-alpine

# Set the working directory to /app
WORKDIR /wms-WebApplication

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
# Copia solo i file necessari per la build dell'applicazione
COPY public ./public
COPY src ./src

RUN npm run build

# Expose port 4001 for the application to run on
EXPOSE 5000

# Start the application
CMD [“npm”, “start”]
