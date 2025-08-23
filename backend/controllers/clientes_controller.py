from database import session
from models import Cliente
from flask import request, jsonify

# Função para listar clientes;
def listar_clientes(usuario_id):
    try:
        clientes = (
            session.query(Cliente)
            .filter(Cliente.usuario_id == usuario_id)
            .all()
        )
        
        clientes_list = [{
            "id": c.id,
            "nome": c.nome,
            "cnpj": c.cnpj,
            "email": c.email,
            "telefone": c.telefone,
            "endereco": c.endereco
        } for c in clientes]

        return jsonify(clientes_list), 200
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        session.remove()

# Função para listar cliente por ID:
def listar_cliente_id(id, id_usuario):
    try:
        # Consulta o cliente solicitado pelo usuário no banco de dados;
        cliente = (
            session.query(Cliente)
            .filter(Cliente.id == id)
            .filter(Cliente.usuario_id == id_usuario)
            .first()
        )
    
        # Caso não seja encontrada...
        if not cliente:
            return jsonify({"error": "Cliente não encontrado"}), 404

        # Cria o dicionário com os dados do cliente;
        cliente_dict = {
            'id': cliente.id,
            'nome': cliente.nome,
            'cnpj': cliente.cnpj,
            'email': cliente.email,
            'telefone': cliente.telefone,
            'endereco': cliente.endereco
        }
        
        # Retorna os dados em formato JSON com status 200 (sucesso);
        return jsonify(cliente_dict), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Encerra a sessão do banco;
        session.remove()

# Rota para criar cliente
def create_cliente(usuario_id):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Dados não informados'}), 400
    
    # Valida campos obrigatórios;
    if not data.get('nome') or not data.get('cnpj') or not data.get('email') or not data.get('telefone') or not data.get('endereco'):
        return jsonify({'error': 'Preencha todos os campos obrigatórios'}), 400

    try:
        # Cria o objeto Cliente;
        novo_cliente = Cliente(
            nome=data['nome'],
            cnpj=data['cnpj'],
            email=data['email'],
            telefone=data['telefone'],
            endereco=data['endereco'],
            usuario_id=usuario_id
        )

        # Adiciona ao banco e confirma a transação;
        session.add(novo_cliente)
        session.commit()

        # Retorna mensagem de sucesso;
        return jsonify({'message': 'Cliente criado com sucesso'}), 201

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

    finally:
        # Encerra a sessão do banco;
        session.remove()

# Rota para atualizar cliente pelo ID
def update_cliente(usuario_id, id):
    data = request.get_json()
    
    try:
        # Busca o cliente pelo ID
        cliente = session.query(Cliente).filter(
            Cliente.usuario_id == usuario_id,
            Cliente.id == id
        ).first()

        if not cliente:
            return jsonify({'error': 'Cliente não encontrado'}), 404

        # Atualiza os campos do objeto com os dados recebidos
        for key, value in data.items():
            setattr(cliente, key, value)

        session.commit()
        return jsonify({'message': 'Cliente atualizado com sucesso'}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

    finally:
        session.remove()