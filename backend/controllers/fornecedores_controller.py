from database import session
from models import Fornecedor
from flask import request, jsonify

# Função para listar fornecedores
def listar_fornecedores():
    try:
        fornecedores = session.query(Fornecedor).all()
        fornecedores_list = [{
            "id": f.id,
            "nome": f.nome,
            "cnpj": f.cnpj,
            "email": f.email,
            "telefone": f.telefone,
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
        'telefone': fornecedor.telefone,
        'endereco': fornecedor.endereco
    })

# Rota para buscar fornecedor por nome
def busca_fornecedor():
    nome = request.args.get('nome')
    if not nome:
        return jsonify({'erro': 'Nome não fornecido'}), 400
    fornecedor = session.query(Fornecedor).filter(Fornecedor.nome.ilike(f'%{nome}%')).all()
    if not fornecedor:
        return jsonify({'erro': 'Fornecedor não encontrado'}), 404
    return jsonify([{
        'id': f.id,
        'nome': f.nome,
        'cnpj': f.cnpj,
        'email': f.email,
        'telefone': f.telefone,
        'endereco': f.endereco
    } for f in fornecedor])

# Rota para deletar fornecedor pelo ID
def delete_fornecedor(id):
    fornecedor = session.query(Fornecedor).get(id)
    if not fornecedor:
        session.close()
        return jsonify({'erro': 'Fornecedor não encontrado'}), 404
    session.delete(fornecedor)
    session.commit()
    return jsonify({'mensagem': 'Fornecedor deletado com sucesso'}), 200

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
            'telefone': fornecedor.telefone,
            'endereco': fornecedor.endereco
        }
    }), 200

# Rota para criar fornecedor
def create_fornecedor():
    data = request.json
    if not data:
        return jsonify({'erro': 'Dados não fornecidos'}), 400
    
    novo_fornecedor = Fornecedor(
        nome=data.get('nome'),
        cnpj=data.get('cnpj'),
        email=data.get('email'),
        contato=data.get('contato'),
        endereco=data.get('endereco')
    )
    
    session.add(novo_fornecedor)
    session.commit()
    
    return jsonify({
        'mensagem': 'Fornecedor criado com sucesso',
        'fornecedor': {
            'id': novo_fornecedor.id,
            'nome': novo_fornecedor.nome,
            'cnpj': novo_fornecedor.cnpj,
            'email': novo_fornecedor.email,
            'contato': novo_fornecedor.contato,
            'endereco': novo_fornecedor.endereco
        }
    }), 201