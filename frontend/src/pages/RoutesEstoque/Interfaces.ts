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
    qtd_produto: number;
    data_entrada: Date;
    data_validade: Date;
    categoria: string
}

export interface DescartEstoque {
    id_lote: number | null
    numero_lote: string;
    quantidade: number | null;
    motivo: string;
}

export interface Lote {
    id: number;
    produto_id: number;
    numero_lote: string;
    validade: Date,
    quantidade: number;
}