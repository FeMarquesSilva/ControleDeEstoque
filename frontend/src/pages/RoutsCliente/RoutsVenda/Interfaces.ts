//Listar as vendas com todas as informações;
export interface VendasDetalhada {
  nome_cliente: string;
  numero_nf: number;
  valor_total: number;
  itens: ItensVenda[];
}

interface ItensVenda {
  produto: string;
  quantidade: number;
  valorunitario: number;
}

// ====================================
//Realizar um nova venda;
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

export interface VendaPayload {
  cliente_id: number | null;
  numeronf: number;
  itens: ItemVenda[];
}

// ====================================
//Lista detalhada de venda por cliente;
export interface VendaPorCliente {
  cliente: string;
  total_venda: number;
}
