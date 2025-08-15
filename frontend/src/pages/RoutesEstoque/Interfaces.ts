export interface Lote {
    id: number | null;
    produto_id: number;
    numero_lote: string;
    validade: Date;
    quantidade: number;
}

export interface EntradaEstoque {
    id: number | null;
    quantidade: number;
    dataentrada: Date;
    validade: Date;
}