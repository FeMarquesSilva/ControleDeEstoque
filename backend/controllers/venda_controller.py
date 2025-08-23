from flask import request, jsonify
from database import session
from models import Venda, VendaProduto, Produto, Cliente
from datetime import datetime
from sqlalchemy import func

# Listar as vendas detalhadas com todos os dados;
def listar_vendas_detalhadas(id_usuario):
    try:
        resultados = (
            session.query(
                Venda.id.label("venda_id"),
                Venda.numeronf.label("numero_nf"),
                Venda.valor_total,
                Cliente.nome.label("nome_cliente"),
                Produto.nome.label("produto_nome"),
                VendaProduto.quantidade,
                VendaProduto.valorunitario
            )
            .join(Cliente, Cliente.id == Venda.cliente_id)
            .join(VendaProduto, VendaProduto.venda_id == Venda.id)
            .join(Produto, Produto.id == VendaProduto.produto_id)
            .filter(Venda.usuario_id == id_usuario)
            .all()
        )

        # Dicionário temporário para agrupar por venda
        vendas_dict = {}

        for r in resultados:
            if r.venda_id not in vendas_dict:
                vendas_dict[r.venda_id] = {
                    "nome_cliente": r.nome_cliente,
                    "numero_nf": r.numero_nf,
                    "valor_total": float(r.valor_total),
                    "itens": []
                }

            # adiciona item dentro da venda
            vendas_dict[r.venda_id]["itens"].append({
                "produto": r.produto_nome,
                "quantidade": r.quantidade,
                "valorunitario": float(r.valorunitario)
            })

        # converte dict em lista para retornar
        vendas = list(vendas_dict.values())

        return jsonify(vendas), 200

    except Exception as e:
        return jsonify({"erro": str(e)}), 500

    finally:
        session.close()

# Listar todas as vendas
def listar_vendas(id_usuario):
    try:
        vendas = (
                session.query(Venda)
                .filter(Venda.usuario_id == id_usuario)
                .all()
            )
    
        vendas_list = [{
            "id": v.id,
            "datavenda": v.datavenda,
            "numeronf": v.numeronf,
            "valor_total": v.valor_total,
            "cliente_id": v.cliente_id,
            "status": v.status
        } for v in vendas]
        
        return jsonify(vendas_list)
    
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    
    finally:
        session.remove()

# Listar vendas por cliente
def listar_vendas_por_cliente(cliente_id):
    try:
        vendas = session.query(Venda, Cliente).join(
            Cliente, Venda.cliente_id == Cliente.id
        ).filter(Venda.cliente_id == cliente_id).all()

        resultado = []
        for venda, cliente in vendas:
            itens = session.query(VendaProduto, Produto).join(
                Produto, VendaProduto.produto_id == Produto.id
            ).filter(VendaProduto.venda_id == venda.id).all()

            resultado.append({
                'venda_id': venda.id,
                'cliente': {'id': cliente.id, 'nome': cliente.nome},
                'valor_total': venda.valor_total,
                'itens': [{
                    'produto_id': produto.id,
                    'nome': produto.nome,
                    'quantidade': vp.quantidade,
                    'valor': vp.valorunitario
                } for vp, produto in itens]
            })
        return jsonify(resultado), 200

    except Exception as e:
        print(f"Erro ao listar vendas por cliente: {e}")
        return jsonify({'erro': 'Erro ao listar vendas por cliente'}), 500
    
    finally:
        session.remove()

# Listar vendas por produto
def listar_vendas_por_produto(produto_id):
    try:
        vendas = session.query(Venda, Cliente).join(
            Cliente, Venda.cliente_id == Cliente.id
        ).join(VendaProduto).filter(VendaProduto.produto_id == produto_id).all()

        resultado = []
        for venda, cliente in vendas:
            itens = session.query(VendaProduto, Produto).join(
                Produto, VendaProduto.produto_id == Produto.id
            ).filter(VendaProduto.venda_id == venda.id).all()

            resultado.append({
                'venda_id': venda.id,
                'cliente': {'id': cliente.id, 'nome': cliente.nome},
                'valor_total': venda.valor_total,
                'itens': [{
                    'produto_id': produto.id,
                    'nome': produto.nome,
                    'quantidade': vp.quantidade,
                    'valor': vp.valorunitario
                } for vp, produto in itens]
            })
        return jsonify(resultado), 200

    except Exception as e:
        print(f"Erro ao listar vendas por produto: {e}")
        return jsonify({'erro': 'Erro ao listar vendas por produto'}), 500

    finally:
        session.remove()

def listar_vendas_total_cliente(id_usuario):
    resultados = (
        session.query(
            Cliente.nome.label("cliente"),
            func.sum(Venda.valor_total).label("total_venda")
        )
        .join(Cliente, Cliente.id == Venda.cliente_id)
        .filter(Venda.usuario_id == id_usuario)
        .group_by(Cliente.nome) 
        .order_by(Cliente.nome)
        .all()
    )
    
    lista = [
        {
            "cliente": r.cliente,
            "total_venda": float(r.total_venda)
        }
        for r in resultados
    ]

    return jsonify(lista)

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
            status='Pendente',
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

# Deletar venda
def deletar_venda(venda_id):
    venda = session.query(Venda).filter(Venda.id == venda_id).first()
    if not venda:
        return jsonify({'error': 'Venda não encontrada'}), 404

    session.delete(venda)
    session.commit()
    return jsonify({'message': 'Venda deletada com sucesso'}), 200