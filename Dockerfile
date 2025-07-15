# Etapa 1: Build da aplicação com pnpm
FROM node:20 AS build-deps

WORKDIR app
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm i
RUN pnpm run build

# Etapa 2: Container final com Nginx
FROM nginx:1.25-alpine

# Copia os arquivos de build para /inspect
COPY --from=build-deps /app/dist /usr/share/nginx/html/inspect

# Copia a configuração customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN echo 'server {\
  listen 80;\
  server_name localhost;\
    \
  root /usr/share/nginx/html;\
  index index.html;\
    \
  access_log /var/log/nginx/access.log;\
  error_log /var/log/nginx/error.log warn;\
    \
  # 1. Cache de arquivos estáticos (JS, CSS, etc.)
  location ~ ^/inspect/assets/ {\
    try_files $uri =404;\
    expires 1y;\
    add_header Cache-Control "public, immutable";\
  }\
    \
  # 2. Fallback para SPA (React Router)
  location /inspect {\
    try_files $uri $uri/ /inspect/index.html;\
  }\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

