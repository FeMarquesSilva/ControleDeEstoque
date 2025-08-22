from database import session
from models import Categoria
from flask import request, jsonify

# Função para listar categorias;
def listar_categorias(id_usuario):
    try:
        # Consulta todas as categorias do usuário no banco de dados;
        categorias = (
            session.query(Categoria)
            .filter(Categoria.usuario_id == id_usuario)
            .all()
        )
        
        # Cria uma lista de dicionários a partir dos objetos retornados;
        categoria_list = [{
            'id': categoria.id,
            'nome': categoria.nome,
            'descricao': categoria.descricao
            } for categoria in categorias]
        
        # Retonar os dados em JSON e status 200 (sucesso)
        return jsonify(categoria_list), 200
    
    # Em caso de erro, retorna a mensagem e status 500;
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    # Encerra a sessão do banco;
    finally:
        session.remove()

# Função para obter uma categoria pelo ID;
def obter_categoria(id, id_usuario):
    try:
        # Consulta a categoria solicitada pelo usuário no banco de dados;
        categoria = (
            session.query(Categoria)
            .filter(Categoria.usuario_id == id_usuario)
            .get(id)
        )
    
    # Caso não seja encontrada...
    if not categoria:
        return jsonify({"error": "Categoria não encontrada"}), 404
    
    # Cria o dicionário com os dados da categoria;
    categoria_dict = {
        'id': categoria.id,
        'nome': categoria.nome,
        'descricao': categoria.descricao
    }
    
    # Retorna os dados em formato JSON com status 200 (sucesso);
    return jsonify(categoria_dict), 200
    
    # Em caso de erro, retorna a mensagem e status 500;
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    # Encerra a sessão do banco;
    finally:
        session.remove()

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

# Função para atualizar uma categoria
def atualizar_categoria(id):
    data = request.get_json()
    categoria = session.query(Categoria).get(id)
    if not categoria:
        return jsonify({"error": "Categoria não encontrada"}), 404
    for key, value in data.items():
        setattr(categoria, key, value)
    session.commit()
    return jsonify({'menssage': 'Categoria editada com sucesso'}), 200

# Função para deletar uma categoria
def deletar_categoria(id):
    categoria = session.query(Categoria).get(id)
    if not categoria:
        return jsonify({"error": "Categoria não encontrada"}), 404
    session.delete(categoria)
    session.commit()
    return jsonify({"message": "Categoria deletada"}), 204