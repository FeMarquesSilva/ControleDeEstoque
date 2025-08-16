from flask import request, jsonify
from controllers.clientes_controller import (
    listar_clientes,
    listar_cliente_id,
    busca_cliente,
    delete_cliente,
    update_cliente,
    create_cliente
)
from controllers.fornecedores_controller import (
    listar_fornecedores,
    listar_fornecedor_id,
    delete_fornecedor,
    update_fornecedor,
    create_fornecedor
)

from controllers.estoque_controller import (
    realizar_entrada_estoque,
    buscar_estoque
)

from controllers.lote_controller import (
    consulta_lotes
)