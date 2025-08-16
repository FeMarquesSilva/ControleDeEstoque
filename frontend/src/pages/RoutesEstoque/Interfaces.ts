export interface EntradaEstoque {
    quantidade: number;
    validade: Date;
    produto_id: number | null;
    numero_lote: string;
}

export interface ListaEstoque {
    id: number;
    numero_lote: string;
    nome_produto: string;
    quantidade: number;
    dataentrada: Date;
    validade: Date;
    nome_categoria: string
}