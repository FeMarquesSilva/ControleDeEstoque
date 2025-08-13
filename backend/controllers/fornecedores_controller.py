from database import session
from models import Fornecedor
from flask import request, jsonify

# Rota para criar fornecedor
def create_fornecedor(id_usuario):
    data = request.json
    if not data:
        return jsonify({'erro': 'Dados não fornecidos'}), 400
    
    novo_fornecedor = Fornecedor(
        nome=data.get('nome'),
        cnpj=data.get('cnpj'),
        email=data.get('email'),
        contato=data.get('contato'),
        endereco=data.get('endereco'),
        usuario_id=id_usuario
    )
    
    session.add(novo_fornecedor)
    session.commit()
    
    return jsonify({
        'mensagem': 'Fornecedor criado com sucesso'
    }), 201
    
# Função para listar fornecedores
def listar_fornecedores(id_usuario):
    try:
        fornecedores = (
            session.query(Fornecedor)
            .filter(Fornecedor.usuario_id == id_usuario)
            .filter(Fornecedor.status == True)
            .all()
        )
        
        fornecedores_list = [{
            "id": f.id,
            "nome": f.nome,
            "cnpj": f.cnpj,
            "email": f.email,
            "contato": f.contato,
            "endereco": f.endereco
        } for f in fornecedores]
        
        return jsonify(fornecedores_list)
    finally:
        session.remove()

# Função para listar fornecedor por ID
def listar_fornecedor_id(id):
    fornecedor = session.query(Fornecedor).get(id)
    if not fornecedor:
        session.close()
        return jsonify({'erro': 'Fornecedor não encontrado'}), 404
    return jsonify({
        'id': fornecedor.id,
        'nome': fornecedor.nome,
        'cnpj': fornecedor.cnpj,
        'email': fornecedor.email,
        'contato': fornecedor.contato,
        'endereco': fornecedor.endereco
    })

# Rota para inativar fornecedor pelo ID
def delete_fornecedor(id):
    fornecedor = session.query(Fornecedor).get(id)
    
    if not fornecedor:
        session.close()
        return jsonify({'erro': 'Fornecedor não encontrado'}), 404
    
    # Apenas altera o status
    fornecedor.status = False
    session.commit()
    session.close()
    
    return jsonify({'mensagem': 'Fornecedor inativado com sucesso'}), 200

# Rota para atualizar fornecedor pelo ID
def update_fornecedor(id):
    fornecedor = session.query(Fornecedor).get(id)
    if not fornecedor:
        session.close()
        return jsonify({'erro': 'Fornecedor não encontrado'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'erro': 'Dados não fornecidos'}), 400
    
    for key, value in data.items():
        setattr(fornecedor, key, value)
    
    session.commit()
    return jsonify({
        'mensagem': 'Fornecedor atualizado com sucesso',
        'fornecedor': {
            'id': fornecedor.id,
            'nome': fornecedor.nome,
            'cnpj': fornecedor.cnpj,
            'email': fornecedor.email,
            'contato': fornecedor.contato,
            'endereco': fornecedor.endereco
        }
    }), 200

