from database import session
from models import Fornecedor, Produto, Lote, VendaProduto
from flask import request, jsonify
from sqlalchemy import func

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


def listar_fornecedores_produtos(id_usuario):
    resultados = (
        session.query(
            Produto.nome.label("nome_produto"),
            Fornecedor.nome.label("nome_fornecedor"),
            func.sum(Lote.quantidade).label("quantidade_total")
        )
        .join(Fornecedor, Fornecedor.id == Produto.fornecedor_id)
        .join(Lote, Lote.produto_id == Produto.id)
        .filter(Produto.usuario_id == id_usuario)  # <-- filtro por usuário
        .group_by(Fornecedor.nome, Produto.nome)
        .order_by(Produto.nome)
        .all()
    )

    lista = [dict(r._mapping) for r in resultados]
    return jsonify(lista)

def listar_fornecedores_produtos_vendas(id_usuario):
    resultados = (
        session.query(
            Fornecedor.nome.label("fornecedor"),
            Produto.nome.label("produto"),
            func.sum(VendaProduto.quantidade).label("total_vendido")
        )
        .join(Produto, Produto.id == VendaProduto.produto_id)
        .join(Fornecedor, Fornecedor.id == Produto.fornecedor_id)
        .filter(Fornecedor.usuario_id == id_usuario)  # ajuste conforme seu modelo
        .group_by(Fornecedor.id, Fornecedor.nome, Produto.nome)
        .all()
    )

    response = [
        {
            "fornecedor": row.fornecedor,
            "produto": row.produto,
            "total_vendido": int(row.total_vendido) if row.total_vendido else 0
        }
        for row in resultados
    ]
    return jsonify(response)

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