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
    realizar_descarte_estoque,
    realizar_saida_estoque_venda,
    buscar_estoque_resumido
)

from controllers.fornecedores_controller import (
    listar_fornecedores,
    listar_fornecedor_id,
    delete_fornecedor,
    update_fornecedor,
    create_fornecedor,
    listar_fornecedores_produtos,
    listar_fornecedores_produtos_vendas
)

from controllers.lote_controller import (
    consulta_lotes,
    consultar_total_produto_em_lotes
)

from controllers.produto_controller import (
    create_produto,
    get_produtos_com_fornecedores_categorias,
    get_produto_por_id,
    update_produto,
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
    listar_vendas_com_clientes,
    listar_vendas_por_cliente,
    listar_vendas_por_produto,
    deletar_venda,
    listar_vendas_total_cliente
)