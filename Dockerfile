# Etapa 1: Build da aplicação com pnpm
FROM node:20 AS build-deps

WORKDIR app
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm i
RUN pnpm run build

# Etapa 2: Container final com Nginx
FROM nginx:1.25-alpine
COPY --from=build-deps /app/dist /usr/share/nginx/html/inspect
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

