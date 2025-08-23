from math import e
from database import session
from models import Produto, Fornecedor, Categoria
from flask import request, jsonify

# Função de listar produtos com join com fornecedores e categorias
def get_produtos_com_fornecedores_categorias(id_usuario):
    try:
        produtos = (
            session.query(Produto, Fornecedor, Categoria)
            .outerjoin(Fornecedor, Produto.fornecedor_id == Fornecedor.id)
            .outerjoin(Categoria, Produto.categoria_id == Categoria.id)
            .filter(Produto.usuario_id == id_usuario)
            .all()
        )

        produtos_list = []
        for p, f, c in produtos:
            produtos_list.append({
                'id': p.id,
                'nome': p.nome,
                'descricao': p.descricao,
                'sku': p.sku,
                'unidademedida': p.unidademedida,
                'status': p.status,
                'fornecedor': f.nome if f else None,
                'categoria': c.nome if c else None,
                'usuario_id': p.usuario_id
            })

        return jsonify(produtos_list), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        session.remove()


# Função de listar produto por ID
def get_produto_por_id(id):
    try:
        produto = session.query(Produto).filter(Produto.id == id).first()
        if not produto:
            return jsonify({'error': 'Produto não encontrado'}), 404

        produto_dict = {
            'id': produto.id,
            'nome': produto.nome,
            'descricao': produto.descricao,
            'sku': produto.sku,
            'unidademedida': produto.unidademedida,
            'status': produto.status,
            'fornecedor_id': produto.fornecedor_id,
            'categoria_id': produto.categoria_id,
            'usuario_id': produto.usuario_id
        }

        return jsonify(produto_dict), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

    finally:
        session.remove()


# Função para criar produto
def create_produto(id_usuario):
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'Dados não fornecidos'}), 400

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
        
        return jsonify({'message': 'Produto criado com sucesso'}), 201

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

    finally:
        session.remove()


# Função de atualizar produtos
def update_produto(usuario_id, id):
    data = request.json
    if not data:
        return jsonify({'error': 'Dados não fornecidos'}), 400

    try:
        produto = (session.query(Produto).filter(
            Produto.id == id,
            Produto.usuario_id == usuario_id
        ).first())

        if not produto:
            return jsonify({'error': 'Produto não encontrado'}), 404

        # Atualiza os campos do objeto com os dados recebidos
        for key, value in data.items():
            setattr(produto, key, value)

        session.commit()

        return jsonify({'message': 'Produto atualizado com sucesso'}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

    finally:
        session.remove()