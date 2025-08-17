export interface Fornecedor {
    id: number | null;
    nome: string;
    cnpj: string;
    contato: string;
    endereco: string;
    email: string;
}

export interface FornecedorProduto {
    nome_fornecedor: string;
    nome_produto: string;
    quantidade_total: number;
}

export interface FornecedorProdutoVenda {
    fornecedor: string;
    produto: string;
    total_vendido: number;
}