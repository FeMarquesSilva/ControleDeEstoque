from database import session
from models import (
    Lote,
    Entradaestoque
)
from flask import request, jsonify
from datetime import datetime

def realizar_entrada_estoque(id_usuario):
    data = request.json
    
    if not data:
        return jsonify({'erro': 'Dados não fornecidos'}), 400
    
    
    
    novo_lote = Lote(
        produto_id=data.get('produto_id'),
        numero_lote=data.get('numero_lote'),
        validade=datetime.strptime(data.get('validade'), "%Y-%m-%dT%H:%M:%S.%fZ").date(),
        quantidade=data.get('quantidade'),
        usuario_id=id_usuario
    )
    
    session.add(novo_lote)
    session.commit()
    
    lote_id = novo_lote.id
    dataentrada = datetime.now()
    
    nova_entrada = Entradaestoque(
        lote_id=lote_id,
        quantidade=data.get('quantidade'),
        dataentrada=dataentrada,
        usuario_id=id_usuario
    )
    
    session.add(nova_entrada)
    session.commit()
    
    return jsonify({
        'mensagem': 'Entrada realizada com sucesso'
    }), 201
    