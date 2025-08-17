   
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

export interface VendaCliente {
    cliente_id: number | null;
    numeronf: number;
    cliente: [{
        id: number;
        nome: string;
    }];
    itens?: ItemVenda[];
}

export interface VendaPorCliente {
    cliente: string;
    total_venda: number;
}