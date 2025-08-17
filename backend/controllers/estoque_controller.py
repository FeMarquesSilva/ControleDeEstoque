from database import session
from models import (
    Lote,
    Entradaestoque,
    Produto,
    Categoria,
    Saidaestoque,
    VendaProduto,
    Venda
)
from flask import request, jsonify
from datetime import datetime
from sqlalchemy import func

def buscar_estoque(id_usuario):
    resultados = (
        session.query(
            Lote.id,
            Lote.numero_lote,
            Produto.nome.label("nome_produto"),
            Lote.quantidade.label("qtd_produto"),
            Entradaestoque.dataentrada.label("data_entrada"),
            Lote.validade.label("data_validade"),
            Categoria.nome.label("categoria")
        )
        .join(Entradaestoque, Entradaestoque.lote_id == Lote.id)
        .join(Produto, Produto.id == Lote.produto_id)
        .join(Categoria, Categoria.id == Produto.categoria_id)
        .filter(Entradaestoque.usuario_id == id_usuario)
        .all()
    )
    
    lista = []
    for r in resultados:
        lista.append({
            "id": r.id,
            "numero_lote": r.numero_lote,
            "nome_produto": r.nome_produto,
            "qtd_produto": r.qtd_produto,
            "data_entrada": r.data_entrada.isoformat() if r.data_entrada else None,
            "data_validade": r.data_validade.isoformat() if r.data_validade else None,
            "categoria": r.categoria
        })
    return jsonify(lista)

def buscar_estoque_resumido(id_usuario):
    print("Chegou aqui")
    resultados = (
        session.query(
            Produto.nome.label("nome_produto"),
            Categoria.nome.label("categoria"),
            Lote.validade.label("data_validade"),
            func.sum(Lote.quantidade).label("total_produto")
        )
        .join(Lote, Lote.produto_id == Produto.id)
        .join(Categoria, Categoria.id == Produto.categoria_id)
        .join(Entradaestoque, Entradaestoque.lote_id == Lote.id)
        .filter(Entradaestoque.usuario_id == id_usuario)
        .group_by(Produto.nome, Categoria.nome, Lote.validade)
        .order_by(Produto.nome, Lote.validade)
        .all()
    )

    # Converte direto para lista de dicionários usando ._asdict()
    lista = [r._asdict() for r in resultados]
    return jsonify(lista)


def realizar_entrada_estoque(id_usuario):
    data = request.json
    
    if not data:
        return jsonify({'erro': 'Dados não fornecidos'}), 400
    
    novo_lote = Lote(
        produto_id=data.get('produto_id'),
        numero_lote=data.get('numero_lote'),
        validade=datetime.strptime(data.get('validade'), "%Y-%m-%dT%H:%M:%S.%fZ").date(),
        quantidade=data.get('quantidade'),
        usuario_id=id_usuario
    )
    
    session.add(novo_lote)
    session.commit()
    
    lote_id = novo_lote.id
    dataentrada = datetime.now()
    
    nova_entrada = Entradaestoque(
        lote_id=lote_id,
        quantidade=data.get('quantidade'),
        dataentrada=dataentrada,
        usuario_id=id_usuario
    )
    
    session.add(nova_entrada)
    session.commit()
    
    return jsonify({
        'mensagem': 'Entrada realizada com sucesso'
    }), 201
    
def realizar_descarte_estoque(id_usuario):
    data = request.json
    if not data:
        return jsonify({'mensagem': 'Dados não informados'}), 400
    
    itens_recebidos = {
        'id_lote': data.get('lote').get('id_lote'),
        'numero_lote': data.get('lote').get('numero_lote'),
        'quantidade': data.get('lote').get('quantidade'),
        'motivo':data.get('lote').get('motivo')
    }
    
    id_lote = itens_recebidos.get('id_lote')

    #Primeiro busca o lote que vou fazer o descarte:
    lote = (
            session.query(Lote)
            .filter(Lote.id == id_lote)
            .filter(Lote.usuario_id == id_usuario)
            .first()
            )
    
    if not lote:
        return jsonify({'mensagem': 'Lote não encontrado'}), 404
    
    #Valida se a quantidade atual do lote é maior ou igual ao qua será descartado:
    if lote.quantidade < itens_recebidos.get('quantidade'):
        return jsonify({'mensagem': 'Quantidade solicitada maior que a quantidade atual'}), 400
    
    #Salva as dados da saida na tabela de saidaEstoque antes de realizar a baixa no estoque:
    saida_estoque = Saidaestoque(
        lote_id = itens_recebidos.get('id_lote'),
        quantidade = itens_recebidos.get('quantidade'),
        motivo = itens_recebidos.get('motivo'),
        datasaida = datetime.now(),
        usuario_id = id_usuario
    )
    
    session.add(saida_estoque)
    session.commit()
    
    #Subtraio a quantidade do lote
    lote.quantidade -= itens_recebidos.get('quantidade')
    session.commit()
    
    return jsonify({'mensagem': 'Descarte realizado com sucesso'}), 201

def realizar_saida_estoque_venda(id_usuario):
    data = request.json
    
    if not data:
        return jsonify({'mensagem': 'Dados não informados'}), 400
    
    itens_recebidos = {
        'lote_id': data.get('saida').get('lote_id'),
        'venda_id': data.get('saida').get('venda_id'),
        'motivo':data.get('saida').get('motivo')
    }
    
    id_lole = itens_recebidos.get('lote_id')
    
    # Primeiro busca o lote que será subtraido a quantidade:
    lote = (
        session.query(Lote)
        .filter(Lote.id == id_lole)
        .filter(Lote.usuario_id == id_usuario)
        .first()
    )
    
    if not lote:
        return jsonify({'mensagem': 'Lote não encontrado'}), 404

    # Busco os dados da venda (vendaProduto) filtrando o produto do lote (Já conta como validação de produto):
    venda_produto = (
        session.query(VendaProduto)
        .filter(VendaProduto.venda_id == itens_recebidos.get('venda_id'))
        .filter(VendaProduto.produto_id == lote.produto_id)
        .filter(VendaProduto.status == 'PENDENTE')
        .first()
    )
    
    if not venda_produto:
        return jsonify({'mensagem': 'Venda não localizada ou produto incopativel ou venda já atendida'}), 404    
    
    # Armazena a quantidade necessária na venda:
    quantidade_necessaria = venda_produto.quantidade

    #Valida se a quantidade atual do lote é maior ou igual a quantidade necessária na venda:
    if lote.quantidade < quantidade_necessaria:
        return jsonify({'mensagem': 'Quantidade insuficiente no lote'}), 400
    
    #Salva a saida do estoque antes de descontar do lote:
    saida_estoque = Saidaestoque(
        lote_id = itens_recebidos.get('lote_id'),
        quantidade = quantidade_necessaria,
        motivo = itens_recebidos.get('motivo'),
        datasaida = datetime.now(),
        usuario_id = id_usuario
    )
    
    session.add(saida_estoque)
    session.commit()
    
    # Subtrai a quantidade do lote:
    lote.quantidade -= quantidade_necessaria
    session.commit()
    
    # Atualizo o status da vendaProduto como 'ATENDIDA':
    venda_produto.status = 'ATENDIDA'
    session.commit()
    
    # Valido se todos os itens da venda foram atendidos e atualizo o status da venda como 'ATENDIDA';
    # Busco noivamente vendaProduto com os mesmo filtros, caso hava resultado, a venda ainda está pendente;
    venda_pendente = (
        session.query(VendaProduto)
        .filter(VendaProduto.venda_id == itens_recebidos.get('venda_id'))
        .filter(VendaProduto.status == 'PENDENTE')
        .count()
    )
    
    if venda_pendente > 0:
        return jsonify({'mensagem': 'Venda realizada com sucesso'}), 201

    venda = (
        session.query(Venda)
        .filter(Venda.id == itens_recebidos.get('venda_id'))
        .first()
    )
    
    # Altero o status da venda de 'Pendente' para 'Atendida':
    venda.status = 'ATENDIDA'
    session.commit()
    
    return jsonify({'mensagem': 'Venda realizada com sucesso e finalizada'}), 201