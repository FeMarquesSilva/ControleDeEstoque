from controllers.clientes_controller import (
    listar_clientes,
    listar_cliente_id,
    busca_cliente,
    delete_cliente,
    update_cliente,
    create_cliente
)
from flask import request, jsonify
from controllers.fornecedores_controller import (
    listar_fornecedores,
    listar_fornecedor_id,
    busca_fornecedor,
    delete_fornecedor,
    update_fornecedor,
    create_fornecedor
)