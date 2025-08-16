  
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

export interface VendaCorreta {
    id: number | null;
    numeronf: string;
    valor_total: number;
    cliente: ClienteVenda[]
}

interface ClienteVenda {
    id: number | null;
    nome: string
}