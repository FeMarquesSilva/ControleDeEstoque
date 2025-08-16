from flask import request, jsonify
from database import session
from models import Venda, VendaProduto, Produto, Cliente
from datetime import datetime

# Função para criar venda (sem mexer no estoque)
def criar_venda(id_usuario):
    dados = request.get_json()
    cliente_id = dados.get('cliente_id')
    numeronf = dados.get('numeronf')
    itens = dados.get('itens', [])

    # valida cliente
    cliente = session.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        return jsonify({'error': 'Cliente não encontrado'}), 404

    try:
        # Calcula valores totais da venda
        valor_total = sum([item['quantidade'] * item['valorunitario'] for item in itens])
        datavenda = datetime.now()

        # Cria venda
        nova_venda = Venda(
            cliente_id=cliente.id,
            numeronf=numeronf,
            valor_total=valor_total,
            datavenda=datavenda,
            usuario_id=id_usuario
        )
        session.add(nova_venda)
        session.commit()

        # Cria itens da venda
        for item in itens:
            venda_produto = VendaProduto(
                venda_id=nova_venda.id,
                produto_id=item['produto_id'],
                quantidade=item['quantidade'],
                valorunitario=item['valorunitario'],
            )
            session.add(venda_produto)
        session.commit()

        return jsonify({
            'venda_id': nova_venda.id,
            'cliente': {'id': cliente.id, 'nome': cliente.nome},
            'valor_total': valor_total,
            'itens': itens
        }), 201

    except Exception as e:
        print(e)
        session.rollback()
        return jsonify({'error': str(e)}), 500

# Listar todas as vendas
def listar_vendas():
    vendas = session.query(Venda).all()
    return jsonify([{
        'venda_id': venda.id,
        'cliente': {'id': venda.cliente.id, 'nome': venda.cliente.nome},
        'valor_total': venda.valortotal,
        'itens': [{
            'produto_id': item.produto.id,
            'nome': item.produto.nome,
            'quantidade': item.quantidade,
            'valor': item.valor
        } for item in venda.itens]
    } for venda in vendas]), 200

# Listar vendas por cliente
def listar_vendas_por_cliente(cliente_id):
    vendas = session.query(Venda).filter(Venda.cliente_id == cliente_id).all()
    return jsonify([{
        'venda_id': venda.id,
        'cliente': {'id': venda.cliente.id, 'nome': venda.cliente.nome},
        'valor_total': venda.valortotal,
        'itens': [{
            'produto_id': item.produto.id,
            'nome': item.produto.nome,
            'quantidade': item.quantidade,
            'valor': item.valor
        } for item in venda.itens]
    } for venda in vendas]), 200

# Listar vendas por produto
def listar_vendas_por_produto(produto_id):
    vendas = session.query(Venda).join(VendaProduto).filter(VendaProduto.produto_id == produto_id).all()
    return jsonify([{
        'venda_id': venda.id,
        'cliente': {'id': venda.cliente.id, 'nome': venda.cliente.nome},
        'valor_total': venda.valortotal,
        'itens': [{
            'produto_id': item.produto.id,
            'nome': item.produto.nome,
            'quantidade': item.quantidade,
            'valor': item.valor
        } for item in venda.itens]
    } for venda in vendas]), 200

# Listar vendas por data
def listar_vendas_por_data(data):
    vendas = session.query(Venda).filter(Venda.datavenda == data).all()
    return jsonify([{
        'venda_id': venda.id,
        'cliente': {'id': venda.cliente.id, 'nome': venda.cliente.nome},
        'valor_total': venda.valortotal,
        'itens': [{
            'produto_id': item.produto.id,
            'nome': item.produto.nome,
            'quantidade': item.quantidade,
            'valor': item.valor
        } for item in venda.itens]
    } for venda in vendas]), 200

# Deletar venda
def deletar_venda(venda_id):
    venda = session.query(Venda).filter(Venda.id == venda_id).first()
    if not venda:
        return jsonify({'error': 'Venda não encontrada'}), 404

    session.delete(venda)
    session.commit()
    return jsonify({'message': 'Venda deletada com sucesso'}), 200