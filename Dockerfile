# Estágio de build da aplicação
FROM node:20-alpine as builder

WORKDIR /app

# Copia os arquivos de configuração do PNPM e do projeto Provider
COPY package.json pnpm-lock.yaml ./
# Instala o PNPM globalmente e busca as dependências para o cache
RUN npm install -g pnpm && pnpm fetch --prod

# Copia o restante do código-fonte do Provider
COPY . .
# Instala as dependências específicas do Provider
RUN pnpm install --shamefully-hoist
RUN pnpm run build # Comando de build do Rsbuild para o provider

# Estágio do servidor Nginx
FROM nginx:alpine as final

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração personalizada do Nginx para o Provider
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos da aplicação construída para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]