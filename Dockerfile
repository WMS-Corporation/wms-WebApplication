# Build stage
FROM node:21.6.2-alpine as build
WORKDIR /wms-WebApplication

COPY public ./public
COPY src ./src
COPY package*.json ./

RUN npm ci
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /wms-WebApplication/build /usr/share/nginx/html

# Copy the custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set environment variables
ENV REACT_APP_API_SERVER_URL="http://localhost:3000"
ENV REACT_APP_TEMPERATURE_REFRIGERATED_VALID_RANGE="-18;0"
ENV REACT_APP_TEMPERATURE_NOT_REFRIGERATED_VALID_RANGE="0;25"

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 4000
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
