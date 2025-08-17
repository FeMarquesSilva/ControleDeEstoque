export const formatDate = (data: string | number | Date) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

//Função para formatar valores em reais R$0.000,00
export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};