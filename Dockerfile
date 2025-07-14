# Etapa 1: build
FROM node:20 AS builder

WORKDIR /app
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm i
RUN pnpm run build

# Etapa 2: imagem de produção
FROM nginx:1.25-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Remove a configuração padrão e adiciona uma customizada para SPA
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
