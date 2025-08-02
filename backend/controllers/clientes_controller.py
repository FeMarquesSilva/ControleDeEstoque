from database import session
from models import Cliente
from flask import jsonify

# Função para listar clientes;
def listar_clientes():
    try:
        clientes = session.query(Cliente).all()
        clientes_list = [{
            "id": c.id,
            "nome": c.nome,
            "cnpj": c.cnpj,
            "email": c.email,
            "telefone": c.telefone,
            "endereco": c.endereco
        } for c in clientes]
        return jsonify(clientes_list)
    finally:
        session.remove()

# Função para listar cliente por ID
def listar_cliente_id(id):
    cliente = session.query(Cliente).get(id)
    if not cliente:
        session.close()
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    return jsonify({
        'id': cliente.id,
        'nome': cliente.nome,
        'cnpj': cliente.cnpj,
        'email': cliente.email,
        'telefone': cliente.telefone,
        'endereco': cliente.endereco
    })

# Rota para buscar cliente por nome
def busca_cliente():
    nome = request.args.get('nome')
    if not nome:
        return jsonify({'erro': 'Nome não fornecido'}), 400
    cliente = session.query(Cliente).filter(Cliente.nome.ilike(f'%{nome}%')).all()
    if not cliente:
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    return jsonify([{
        'id': c.id,
        'nome': c.nome,
        'cnpj': c.cnpj,
        'email': c.email,
        'telefone': c.telefone,
        'endereco': c.endereco
    } for c in cliente])

# Rota para deletar cliente pelo ID
def delete_cliente(id):
    cliente = session.query(Cliente).get(id)
    if not cliente:
        session.close()
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    session.delete(cliente)
    session.commit()
    session.close()
    return jsonify({'mensagem': 'Cliente deletado com sucesso'})

# Rota para atualizar cliente pelo ID
def update_cliente(id):
    data = request.json
    cliente = session.query(Cliente).get(id)
    if not cliente:
        session.close()
        return jsonify({'erro': 'Cliente não encontrado'}), 404
    cliente.nome = data.get('nome', cliente.nome)
    cliente.cnpj = data.get('cnpj', cliente.cnpj)
    cliente.email = data.get('email', cliente.email)
    session.commit()
    session.close()
    return jsonify({'mensagem': 'Cliente atualizado com sucesso'})

# Rota para criar cliente
def create_cliente():
    data = request.json
    novo_cliente = Cliente(
        nome=data.get('nome'),
        cnpj=data.get('cnpj'),
        email=data.get('email')
    )
    session.add(novo_cliente)
    session.commit()
    id_cliente = novo_cliente.id
    session.close()
    return jsonify({'mensagem': 'Cliente criado com sucesso', 'id': id_cliente}), 201