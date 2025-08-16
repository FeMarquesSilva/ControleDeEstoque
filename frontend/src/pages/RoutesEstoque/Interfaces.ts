export interface EntradaEstoque {
    quantidade: number;
    validade: Date;
    produto_id: number | null;
    numero_lote: string;
}