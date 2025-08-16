export interface EntradaEstoque {
    id: number | null;
    quantidade: number;
    validade: Date;
    produto_id: number | null;
    numero_lote: string;
}