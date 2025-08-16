from database import session
from models import (
    Lote,
    Entradaestoque,
    Produto,
    Categoria
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
    
def buscar_estoque():
    resultados = (
        session.query(
            Lote.id,
            Lote.numero_lote,
            Produto.nome.label("nome_produto"),
            Lote.quantidade.label("qtd_produto"),
            EntradaEstoque.dataentrada.label("data_entrada"),
            Lote.validade.label("data_validade"),
            Categoria.nome.label("categoria")
        )
        .join(EntradaEstoque, EntradaEstoque.lote_id == Lote.id)
        .join(Produto, Produto.id == Lote.produto_id)
        .join(Categoria, Categoria.id == Produto.categoria_id)
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