export interface optionSelect {
    label: string | number;
    value: number;
}

export interface Produto {
    id: number | null;
    nome: string;
    descricao: string;
    sku: string;
    unidademedida: string;
    status: boolean;
    fornecedor_id: number | null
    categoriaid: number | null
}