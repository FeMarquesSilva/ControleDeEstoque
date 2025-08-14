from database import session
from models import Produto
from flask import request, jsonify
from models import Fornecedor, Categoria

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

# função de listar produtos com join com fornecedores e categorias
def get_produtos_com_fornecedores_categorias():
    
    produtos = (
        session.query(Produto, Fornecedor, Categoria)
        .join(Fornecedor, Produto.fornecedor_id == Fornecedor.id)
        .join(Categoria, Produto.categoriaid == Categoria.id)
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
            'fornecedor': f.nome,
            'categoria': c.nome,
            'usuario_id': p.usuario_id
        }
        for p, f, c in produtos
    ]), 200

# função de listar produtos por id
def get_produto_por_id(id):
    produto = session.query(Produto).join(Fornecedor).join(Categoria).filter(Produto.id == id).first()
    if not produto:
        return jsonify({'erro': 'Produto não encontrado'}), 404

    return jsonify({
        'id': produto.id,
        'nome': produto.nome,
        'descricao': produto.descricao,
        'sku': produto.sku,
        'unidademedida': produto.unidademedida,
        'status': produto.status,
        'fornecedor': produto.fornecedor.nome,
        'categoria': produto.categoria.nome,
        'usuario_id': produto.usuario_id
    }), 200

# função de listar produtos por fornecedor
def get_produtos_por_fornecedor(fornecedor_id):
    produtos = session.query(Produto).join(Fornecedor).filter(Produto.fornecedor_id == fornecedor_id).all()
    return jsonify([{
        'id': p.id,
        'nome': p.nome,
        'descricao': p.descricao,
        'sku': p.sku,
        'unidademedida': p.unidademedida,
        'status': p.status,
        'fornecedor': p.fornecedor.nome,
        'categoria': p.categoria.nome,
        'usuario_id': p.usuario_id
    } for p in produtos]), 200

# função de listar produtos por categoria
def get_produtos_por_categoria(categoria_id):
    produtos = session.query(Produto).join(Categoria).filter(Produto.categoriaid == categoria_id).all()
    return jsonify([{
        'id': p.id,
        'nome': p.nome,
        'descricao': p.descricao,
        'sku': p.sku,
        'unidademedida': p.unidademedida,
        'status': p.status,
        'fornecedor': p.fornecedor.nome,
        'categoria': p.categoria.nome,
        'usuario_id': p.usuario_id
    } for p in produtos]), 200

# função de listar produtos por status
def get_produtos_por_status(status):
    produtos = session.query(Produto).filter(Produto.status == status).all()
    return jsonify([{
        'id': p.id,
        'nome': p.nome,
        'descricao': p.descricao,
        'sku': p.sku,
        'unidademedida': p.unidademedida,
        'status': p.status,
        'fornecedor': p.fornecedor.nome,
        'categoria': p.categoria.nome,
        'usuario_id': p.usuario_id
    } for p in produtos]), 200

# função de deletar produtos
def delete_produto(id):
    produto = session.query(Produto).filter(Produto.id == id).first()
    if not produto:
        return jsonify({'erro': 'Produto não encontrado'}), 404

    session.delete(produto)
    session.commit()

    return jsonify({'mensagem': 'Produto deletado com sucesso'}), 200

# função de atualizar produtos
def update_produto(id, data):
    produto = session.query(Produto).filter(Produto.id == id).first()
    if not produto:
        return jsonify({'erro': 'Produto não encontrado'}), 404

    for key, value in data.items():
        setattr(produto, key, value)

    session.commit()

    return jsonify({'mensagem': 'Produto atualizado com sucesso'}), 200

# função para listar produtos por lote
def get_produtos_por_lote(lote_id):
    produtos = session.query(Produto).join(Fornecedor).join(Categoria).filter(Produto.lote_id == lote_id).all()
    return jsonify([{
        'id': p.id,
        'nome': p.nome,
        'descricao': p.descricao,
        'sku': p.sku,
        'unidademedida': p.unidademedida,
        'status': p.status,
        'fornecedor': p.fornecedor.nome,
        'categoria': p.categoria.nome,
        'usuario_id': p.usuario_id
    } for p in produtos]), 200
