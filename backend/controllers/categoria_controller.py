from database import session
from models import Categoria
from flask import request, jsonify

# Função para criar categoria
def create_categoria(id_usuario):
    data = request.get_json()
    nova_categoria = Categoria(
        nome=data['nome'],
        descricao=data['descricao'],
        usuario_id=id_usuario
    )
    session.add(nova_categoria)
    session.commit()
    return jsonify({'message': 'Categoria criada com sucesso'}), 201

# Função para listar categorias
def listar_categorias():
    try:
        categorias = session.query(Categoria).all()
        categoria_list = [{
            'id': categoria.id,
            'nome': categoria.nome,
            'descricao': categoria.descricao
            } for categoria in categorias]
        return jsonify(categoria_list), 200
    finally:
        session.remove()

# Função para obter uma categoria pelo ID
def obter_categoria(id):
    categoria = session.query(Categoria).get(id)
    if not categoria:
        return jsonify({"error": "Categoria não encontrada"}), 404
    return jsonify(categoria.to_dict()), 200

# Função para atualizar uma categoria
def atualizar_categoria(id):
    data = request.get_json()
    categoria = session.query(Categoria).get(id)
    if not categoria:
        return jsonify({"error": "Categoria não encontrada"}), 404
    for key, value in data.items():
        setattr(categoria, key, value)
    session.commit()
    return jsonify(categoria.to_dict()), 200

# Função para deletar uma categoria
def deletar_categoria(id):
    categoria = session.query(Categoria).get(id)
    if not categoria:
        return jsonify({"error": "Categoria não encontrada"}), 404
    session.delete(categoria)
    session.commit()
    return jsonify({"message": "Categoria deletada"}), 204
