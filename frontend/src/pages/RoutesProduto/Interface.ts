export interface optionSelect {
    label: string | number; 
    value: string | number;
}

export interface Produto {
    id: number;
    nome: string;
    sku: string;
    unidademedida: string;
    status: boolean;

    
}

    nome: Mapped[str] = mapped_column(VARCHAR(100))
    descricao: Mapped[str] = mapped_column(VARCHAR(100))
    sku: Mapped[str] = mapped_column(VARCHAR(50))
    unidademedida: Mapped[str] = mapped_column(VARCHAR(10))
    status: Mapped[float] = mapped_column(NUMBER(asdecimal=False))
    fornecedor_id: Mapped[int] = mapped_column(Integer)
    categoriaid: Mapped[Optional[int]] = mapped_column(Integer)
    usuario_id: Mapped[int] = mapped_column(Integer)