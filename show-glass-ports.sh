#!/bin/bash

# Script para mostrar as portas do Glass

echo "🔍 Procurando portas do Glass..."

# Procurar no processo do node/electron as portas que estão escutando
PORTS=$(lsof -nP -iTCP -sTCP:LISTEN | grep -E "node.*glass|electron.*glass" | grep -v "Visual Studio" | awk '{print $9}' | grep -o '[0-9]*$' | sort -u)

if [ -z "$PORTS" ]; then
    echo "❌ Glass não está rodando ou não encontrei as portas"
    echo "   Certifique-se de que o Glass está rodando com ./start-glass.sh"
else
    echo "✅ Portas encontradas do Glass:"
    for PORT in $PORTS; do
        echo "   - http://localhost:$PORT"
    done
    
    # Tentar identificar qual é Frontend e qual é API
    echo ""
    echo "📝 Testando as portas:"
    for PORT in $PORTS; do
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT 2>/dev/null)
        if [ "$RESPONSE" = "200" ]; then
            echo "   - Porta $PORT está respondendo (provavelmente Frontend)"
        else
            echo "   - Porta $PORT (provavelmente API)"
        fi
    done
fi