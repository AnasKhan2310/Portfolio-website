# Step 1: Build the React app
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Set CI=true to avoid build issues in container environments
RUN CI=true npm run build

# Step 2: Serve the app using Nginx
FROM nginx:stable-alpine

# Create a basic nginx config
RUN printf "server { \
    listen 8080; \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    location / { \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
