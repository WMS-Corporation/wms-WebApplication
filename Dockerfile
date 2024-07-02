FROM node:13.12.0-alpine AS build-step

# Install the app
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install --silent

# Build the app
COPY . /app
RUN npm run-script build

# Create nginx server and copy build there
FROM nginx:1.19-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]