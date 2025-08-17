from database import session
from models import (
    Lote,
    Entradaestoque,
    Produto,
    Categoria,
    Saidaestoque,
    VendaProduto
)
from flask import request, jsonify
from datetime import datetime

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

    # Busco os dados da venda:
    venda_produto = (
        session.query(VendaProduto)
        .filter(VendaProduto.venda_id == itens_recebidos.get('venda_id'))
        .first()
    )
    
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
    
    return jsonify({'mensagem': 'Venda realizada com sucesso'}), 201