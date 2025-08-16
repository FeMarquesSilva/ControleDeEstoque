from controllers.categoria_controller import (
    create_categoria,
    listar_categorias,
    obter_categoria,
    atualizar_categoria,
    deletar_categoria,
)

from controllers.clientes_controller import (
    listar_clientes,
    listar_cliente_id,
    delete_cliente,
    update_cliente,
    create_cliente
)

from controllers.estoque_controller import (
    realizar_entrada_estoque,
    buscar_estoque,
    realizar_descarte_estoque
)

from controllers.fornecedores_controller import (
    listar_fornecedores,
    listar_fornecedor_id,
    delete_fornecedor,
    update_fornecedor,
    create_fornecedor
)

from controllers.lote_controller import (
    consulta_lotes
)

from controllers.produto_controller import (
    create_produto,
    get_produtos_com_fornecedores_categorias,
    get_produto_por_id,
    get_produtos_por_fornecedor,
    get_produtos_por_categoria,
    get_produtos_por_status,
    delete_produto,
    update_produto,
    get_produtos_por_lote
)

from controllers.search_id_user_controller import (
    buscar_id_user
)

from controllers.user_auth_controller import (
    cadastrar_usuario,
    login_usuario
)

from controllers.venda_controller import (
    criar_venda,
    listar_vendas,
    listar_vendas_por_cliente,
    listar_vendas_por_produto,
    listar_vendas_por_data,
    deletar_venda,
)