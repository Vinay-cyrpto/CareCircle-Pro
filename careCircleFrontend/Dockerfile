# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Default Nginx port is 80, but user requested 5173 or we can stick to 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
