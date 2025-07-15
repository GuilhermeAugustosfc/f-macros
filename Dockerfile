# Etapa 1: Build da aplicação com pnpm
FROM node:20 AS builder

WORKDIR /app

# Habilita o corepack e ativa o pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia arquivos de dependência e instala
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copia todo o código-fonte e gera o build
COPY . .
RUN pnpm run build

# Etapa 2: Container final com Nginx
FROM nginx:1.25-alpine

# Cria diretório onde a aplicação será servida
RUN mkdir -p /usr/share/nginx/html/inspect

# Copia os arquivos de build para o subdiretório /inspect
COPY --from=builder /app/dist /usr/share/nginx/html/inspect

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando padrão do Nginx para rodar no foreground
CMD ["nginx", "-g", "daemon off;"]
