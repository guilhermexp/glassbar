#!/bin/bash

# Script para iniciar o Glass

echo "🚀 Iniciando Glass..."

# Navegar para o diretório do projeto
cd "$(dirname "$0")"

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install --ignore-scripts
    npx electron-rebuild
fi

# Verificar se o frontend está construído
if [ ! -d "pickleglass_web/out" ]; then
    echo "🔨 Construindo frontend..."
    cd pickleglass_web
    npm install
    npm run build
    cd ..
fi

# Iniciar a aplicação
echo "✨ Iniciando aplicação..."
npm start

# Manter o terminal aberto se houver erro
if [ $? -ne 0 ]; then
    echo "❌ Erro ao iniciar a aplicação"
    read -p "Pressione Enter para fechar..."
fi