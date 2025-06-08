# frontend/Dockerfile
FROM node:18 as builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Stage 2 - Serve with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf


