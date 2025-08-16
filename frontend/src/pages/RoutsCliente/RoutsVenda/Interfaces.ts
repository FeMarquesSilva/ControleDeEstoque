   
export interface Venda {
    cliente_id: number | null;
    numeronf: number;
    itens?: ItemVenda[];
}

export interface ItemVenda {
    produto_id: number | null;
    venda: Venda | null;
    quantidade: number;
    valorunitario: number;
}