#!/bin/bash

# Script de deploy para f-macros com pnpm e Docker
echo "Iniciando deploy do f-macros..."

# Clone do repositório
git clone https://github.com/GuilhermeAugustosfc/f-macros.git
cd f-macros

# Checkout da branch master
git checkout master
git pull origin master

# Build da aplicação usando Docker (com output em tempo real)
echo "Fazendo build da aplicação (isso pode levar alguns minutos)..."
if ! docker build -t f-macros:latest . --progress=plain; then
    echo "❌ Erro no build da aplicação Docker"
    cd ..
    rm -rf f-macros/
    exit 1
fi

# Criar container temporário para extrair os arquivos
echo "Extraindo arquivos do build..."
if ! docker create --name f-macros-temp f-macros:latest; then
    echo "❌ Erro ao criar container temporário"
    cd ..
    rm -rf f-macros/
    exit 1
fi

# Criar diretório de destino se não existir
sudo mkdir -p /var/www/html/homologacao/f-macros

# Copiar arquivos do container para o servidor
echo "Copiando arquivos para /var/www/html/homologacao/f-macros..."
if ! sudo docker cp f-macros-temp:/usr/share/nginx/html/f-macros/. /var/www/html/homologacao/f-macros/; then
    echo "❌ Erro ao copiar arquivos"
    docker rm f-macros-temp
    cd ..
    rm -rf f-macros/
    exit 1
fi

# Remover container temporário
docker rm f-macros-temp

# Verificar se os arquivos foram copiados
if [ -f "/var/www/html/homologacao/f-macros/index.html" ]; then
    echo "✅ Arquivos copiados com sucesso!"
    echo "🌐 Aplicação disponível em: /var/www/html/homologacao/f-macros"
else
    echo "❌ Erro ao copiar arquivos - index.html não encontrado"
    cd ..
    rm -rf f-macros/
    exit 1
fi

# Limpeza
cd ..
rm -rf f-macros/

echo "✅ Deploy concluído com sucesso!"

