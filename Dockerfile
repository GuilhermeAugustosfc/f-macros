FROM node:20 AS build-deps

WORKDIR /app
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm i
RUN pnpm run build

FROM nginx:1.25-alpine

# Copia os arquivos de build para /inspect
COPY --from=build-deps /app/dist /usr/share/nginx/html/f-inspect

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

