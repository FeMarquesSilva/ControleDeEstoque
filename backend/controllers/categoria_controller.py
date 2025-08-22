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
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()

# Função para obter uma categoria pelo ID;
def obter_categoria(id, id_usuario):
    try:
        # Consulta a categoria solicitada pelo usuário no banco de dados;
        categoria = (
            session.query(Categoria)
            .filter(Categoria.id == id)
            .filter(Categoria.usuario_id == id_usuario)
            .first()
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
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()

# Função para criar uma categoria;
def create_categoria(id_usuario):
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Dados não informados'}), 400
    
    # Valida campos obrigatórios;
    if 'nome' not in data or 'descricao' not in data:
        return jsonify({'message': 'Campos "nome" e "descricao" são obrigatórios'}), 400
    
    try:
        # Cria o objeto Categoria;
        nova_categoria = Categoria(
            nome=data['nome'],
            descricao=data['descricao'],
            usuario_id=id_usuario
        )
        
        # Adiciona ao banco e confirma a transação;
        session.add(nova_categoria)
        session.commit()
        
        # Retorna mensagem de sucesso;
        return jsonify({'message': 'Categoria criada com sucesso'}), 201
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()

# Função para atualizar uma categoria
def atualizar_categoria(id):
    data = request.get_json()
    
    try:
        # Busca a categoria pelo ID
        categoria = session.query(Categoria).get(id)
        
        # Verifica se a categoria existe
        if not categoria:
            return jsonify({"error": "Categoria não encontrada"}), 404
        
        # Atualiza os campos do objeto com os dados recebidos
        for key, value in data.items():
            setattr(categoria, key, value)
        
        # Salva as alterações no banco
        session.commit()
        
        return jsonify({'menssage': 'Categoria editada com sucesso'}), 200
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()
