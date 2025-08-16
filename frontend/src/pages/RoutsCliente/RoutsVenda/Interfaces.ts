export interface Venda {
    id: number | null;
    cliente_id: number | null;
    valor_total: number;
    quantidade_total: number;
    itens: Array<{
        produto_id: number | null;
        nome: string;
        categoria: string;
        quantidade: number;
        preco_unitario: number;
        desconto_percent: number;
        subtotal: number;
    }>;
}


{ /* 
    
export interface Venda {
    cliente_id: number | null;
    numeronf: number;
    quantidade: number;
    valorunitario: number;
    produto_id: number | null;
}
    
    */}