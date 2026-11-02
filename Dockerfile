# Production image: build the SPA, serve it with Nginx.
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ARG VITE_AUTH_URL
ARG VITE_APP_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_AUTH_URL=${VITE_AUTH_URL}
ENV VITE_APP_URL=${VITE_APP_URL}

RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# 80 = local/standalone Docker usage, 3000 = existing ECS target group port.
EXPOSE 80 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/ || exit 1
