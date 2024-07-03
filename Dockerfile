# Use an official Node runtime as a parent image
FROM node:21.6.2-alpine

WORKDIR /wms-WebApplication


COPY public ./public
COPY src ./src
COPY package*.json ./

RUN npm ci

RUN npm run build

# Set the react app port
ENV PORT 5000
# Expose the port the app runs in
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
