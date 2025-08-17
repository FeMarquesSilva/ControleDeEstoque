from database import session
from models import Produto, Fornecedor, Categoria
from flask import request, jsonify

# Função para criar produto
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
        categoria_id=data.get('categoria_id'),
        usuario_id=id_usuario
    )
    
    session.add(novo_produto)
    session.commit()
    
    return jsonify({
        'mensagem': 'Produto criado com sucesso'
    }), 201

# 🔹 Função de listar produtos com join com fornecedores e categorias
def get_produtos_com_fornecedores_categorias(id_usuario):
    produtos = (
        session.query(Produto, Fornecedor, Categoria)
        .outerjoin(Fornecedor, Produto.fornecedor_id == Fornecedor.id)
        .outerjoin(Categoria, Produto.categoria_id == Categoria.id)
        .filter(Produto.usuario_id == id_usuario)
        .all()
    )

    return jsonify([
        {
            'id': p.id,
            'nome': p.nome,
            'descricao': p.descricao,
            'sku': p.sku,
            'unidademedida': p.unidademedida,
            'status': p.status,
            'fornecedor': f.nome if f else None,
            'categoria': c.nome if c else None,
            'usuario_id': p.usuario_id
        }
        for p, f, c in produtos
    ]), 200

# 🔹 Função de listar produto por ID
def get_produto_por_id(id):
    produto = (
        session.query(Produto)
        .outerjoin(Fornecedor)
        .outerjoin(Categoria)
        .filter(Produto.id == id)
        .first()
    )
    if not produto:
        return jsonify({'erro': 'Produto não encontrado'}), 404

    return jsonify({
        'id': produto.id,
        'nome': produto.nome,
        'descricao': produto.descricao,
        'sku': produto.sku,
        'unidademedida': produto.unidademedida,
        'status': produto.status,
        'fornecedor': produto.fornecedor.nome if produto.fornecedor else None,
        'categoria': produto.categoria.nome if produto.categoria else None,
        'usuario_id': produto.usuario_id
    }), 200

# 🔹 Função de listar produtos por fornecedor
def get_produtos_por_fornecedor(fornecedor_id):
    produtos = session.query(Produto).outerjoin(Fornecedor).filter(Produto.fornecedor_id == fornecedor_id).all()
    return jsonify([{
        'id': p.id,
        'nome': p.nome,
        'descricao': p.descricao,
        'sku': p.sku,
        'unidademedida': p.unidademedida,
        'status': p.status,
        'fornecedor': p.fornecedor.nome if p.fornecedor else None,
        'categoria': p.categoria.nome if p.categoria else None,
        'usuario_id': p.usuario_id
    } for p in produtos]), 200

# 🔹 Função de listar produtos por categoria
def get_produtos_por_categoria(categoria_id):
    produtos = session.query(Produto).outerjoin(Categoria).filter(Produto.categoria_id == categoria_id).all()
    return jsonify([{
        'id': p.id,
        'nome': p.nome,
        'descricao': p.descricao,
        'sku': p.sku,
        'unidademedida': p.unidademedida,
        'status': p.status,
        'fornecedor': p.fornecedor.nome if p.fornecedor else None,
        'categoria': p.categoria.nome if p.categoria else None,
        'usuario_id': p.usuario_id
    } for p in produtos]), 200

# 🔹 Função de listar produtos por status
def get_produtos_por_status(status: str):
    # Converte "true"/"false" para bool
    status_bool = status.lower() == "true"
    produtos = session.query(Produto).filter(Produto.status == status_bool).all()
    return jsonify([{
        'id': p.id,
        'nome': p.nome,
        'descricao': p.descricao,
        'sku': p.sku,
        'unidademedida': p.unidademedida,
        'status': p.status,
        'fornecedor': p.fornecedor.nome if p.fornecedor else None,
        'categoria': p.categoria.nome if p.categoria else None,
        'usuario_id': p.usuario_id
    } for p in produtos]), 200

# 🔹 Função de deletar produtos
def delete_produto(id):
    produto = session.query(Produto).filter(Produto.id == id).first()
    if not produto:
        return jsonify({'erro': 'Produto não encontrado'}), 404

    session.delete(produto)
    session.commit()

    return jsonify({'mensagem': 'Produto deletado com sucesso'}), 200

# 🔹 Função de atualizar produtos
def update_produto(id, data):
    produto = session.query(Produto).filter(Produto.id == id).first()
    if not produto:
        return jsonify({'erro': 'Produto não encontrado'}), 404

    for key, value in data.items():
        setattr(produto, key, value)

    session.commit()

    return jsonify({'mensagem': 'Produto atualizado com sucesso'}), 200

# 🔹 Função para listar produtos por lote
def get_produtos_por_lote(lote_id):
    produtos = session.query(Produto).outerjoin(Fornecedor).outerjoin(Categoria).filter(Produto.lote_id == lote_id).all()
    return jsonify([{
        'id': p.id,
        'nome': p.nome,
        'descricao': p.descricao,
        'sku': p.sku,
        'unidademedida': p.unidademedida,
        'status': p.status,
        'fornecedor': p.fornecedor.nome if p.fornecedor else None,
        'categoria': p.categoria.nome if p.categoria else None,
        'usuario_id': p.usuario_id
    } for p in produtos]), 200