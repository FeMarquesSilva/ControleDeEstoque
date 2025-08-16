from flask import Flask, request, jsonify
from database import session
from models import Venda, VendaProduto, Produto, Cliente, Categoria

app = Flask(__name__)

def criar_venda():
    """
    Cria uma venda:
    - Valida cliente
    - Verifica estoque dos produtos
    - Aplica descontos por produto ou categoria
    - Calcula subtotal e valor total
    - Salva venda e itens
    """
    dados = request.get_json()
    cliente_id = dados.get('cliente_id')
    produtos_dados = dados.get('produtos')  # [{produto_id, quantidade, desconto_percent}]

    # Valida cliente
    cliente = session.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        return jsonify({'error': 'Cliente não encontrado'}), 404

    if not produtos_dados or not isinstance(produtos_dados, list):
        return jsonify({'error': 'Lista de produtos inválida ou vazia'}), 400

    try:
        nova_venda = Venda(cliente=cliente, valor_total=0)
        session.add(nova_venda)

        valor_total = 0
        quantidade_total = 0
        itens_venda = []

        for item in produtos_dados:
            produto = session.query(Produto).join(Categoria).filter(Produto.id == item.get('produto_id')).first()
            if not produto:
                return jsonify({'error': f"Produto com id {item.get('produto_id')} não encontrado"}), 404

            quantidade = item.get('quantidade', 1)
            desconto = item.get('desconto_percent', 0)  # desconto em %

            # Verifica estoque
            if produto.estoque < quantidade:
                return jsonify({'error': f"Estoque insuficiente para {produto.nome} (disponível: {produto.estoque})"}), 400

            # Calcula subtotal com desconto
            preco_unitario = produto.preco
            subtotal = preco_unitario * quantidade * (1 - desconto/100)
            valor_total += subtotal
            quantidade_total += quantidade

            # Cria item da venda
            venda_produto = VendaProduto(
                venda=nova_venda,
                produto=produto,
                quantidade=quantidade,
                valor=subtotal,
                categoria_id=produto.categoria_id,
                desconto_percent=desconto
            )
            session.add(venda_produto)

            # Atualiza estoque
            produto.estoque -= quantidade

            itens_venda.append({
                'produto_id': produto.id,
                'nome': produto.nome,
                'categoria': produto.categoria.nome,
                'quantidade': quantidade,
                'preco_unitario': preco_unitario,
                'desconto_percent': desconto,
                'subtotal': subtotal
            })

        nova_venda.valor_total = valor_total
        nova_venda.quantidade_total = quantidade_total
        session.commit()

        venda_final = {
            'venda_id': nova_venda.id,
            'cliente': {'id': cliente.id, 'nome': cliente.nome},
            'valor_total': valor_total,
            'quantidade_total': quantidade_total,
            'itens': itens_venda
        }

        return jsonify(venda_final), 201
    
    except Exception as e:
        session.rollback()
        return jsonify({'error': str(e)}), 500
    
# função para listar vendas realizadas
def listar_vendas():
    vendas = session.query(Venda).all()
    return jsonify([{
        'venda_id': venda.id,
        'cliente': {'id': venda.cliente.id, 'nome': venda.cliente.nome},
        'valor_total': venda.valor_total,
        'quantidade_total': venda.quantidade_total,
        'itens': [{
            'produto_id': item.produto.id,
            'nome': item.produto.nome,
            'quantidade': item.quantidade,
            'valor': item.valor
        } for item in venda.itens]
    } for venda in vendas]), 200

# função para listar vendas por cliente
def listar_vendas_por_cliente(cliente_id):
    vendas = session.query(Venda).filter(Venda.cliente_id == cliente_id).all()
    return jsonify([{
        'venda_id': venda.id,
        'cliente': {'id': venda.cliente.id, 'nome': venda.cliente.nome},
        'valor_total': venda.valor_total,
        'quantidade_total': venda.quantidade_total,
        'itens': [{
            'produto_id': item.produto.id,
            'nome': item.produto.nome,
            'quantidade': item.quantidade,
            'valor': item.valor
        } for item in venda.itens]
    } for venda in vendas]), 200

# função para listar vendas por produto
@app.route('/vendas/produto/<int:produto_id>', methods=['GET'])
def listar_vendas_por_produto(produto_id):
    vendas = session.query(Venda).join(VendaProduto).filter(VendaProduto.produto_id == produto_id).all()
    return jsonify([{
        'venda_id': venda.id,
        'cliente': {'id': venda.cliente.id, 'nome': venda.cliente.nome},
        'valor_total': venda.valor_total,
        'quantidade_total': venda.quantidade_total,
        'itens': [{
            'produto_id': item.produto.id,
            'nome': item.produto.nome,
            'quantidade': item.quantidade,
            'valor': item.valor
        } for item in venda.itens]
    } for venda in vendas]), 200

# função para listar vendas por data
def listar_vendas_por_data(data):
    vendas = session.query(Venda).filter(Venda.data == data).all()
    return jsonify([{
        'venda_id': venda.id,
        'cliente': {'id': venda.cliente.id, 'nome': venda.cliente.nome},
        'valor_total': venda.valor_total,
        'quantidade_total': venda.quantidade_total,
        'itens': [{
            'produto_id': item.produto.id,
            'nome': item.produto.nome,
            'quantidade': item.quantidade,
            'valor': item.valor
        } for item in venda.itens]
    } for venda in vendas]), 200

# função para deletar venda
def deletar_venda(venda_id):
    venda = session.query(Venda).filter(Venda.id == venda_id).first()
    if not venda:
        return jsonify({'error': 'Venda não encontrada'}), 404

    session.delete(venda)
    session.commit()
    return jsonify({'message': 'Venda deletada com sucesso'}), 200