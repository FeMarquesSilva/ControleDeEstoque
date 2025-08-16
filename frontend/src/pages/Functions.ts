export const formatDate = (data: string | number | Date) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}