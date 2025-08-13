from database import session
from models import Produto
from flask import request, jsonify

def create_produto(id_usuario):
    data = request.json
    if not data:
        return jsonify({'erro': 'Dados não fornecidos'}), 400
    
    novo_produto = Produto(
        nome=data.get('nome'),
        descricao=data.get('descricao'),
        sku=data.get('sku'),
        unidademedida=data.get('unidademedida'),
        status=data.get('status'),
        fornecedor_id=data.get('fornecedor_id'),
        categoriaid=data.get('categoriaid'),
        usuario_id=id_usuario
    )
    
    session.add(novo_produto)
    session.commit()
    
    return jsonify({
        'mensagem': 'Fornecedor criado com sucesso'
    }), 201