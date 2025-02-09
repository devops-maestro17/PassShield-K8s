# Build stage
FROM node:23-alpine AS build-stage
WORKDIR /app

# Define build-time argument
ARG REACT_APP_API_URL

# Set environment variable
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
ARG NGINX_CONFIG=nginx.prod.conf
COPY ${NGINX_CONFIG} /etc/nginx/conf.d/default.conf
RUN mkdir -p /run/nginx
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
CMD curl -f http://localhost/health || exit 1
CMD ["nginx", "-g", "daemon off;"]