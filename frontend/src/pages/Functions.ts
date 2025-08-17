import { menssage } from "../components/ui/toastMenssage";

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

//Função para validar e-mail
export const validarEmail = (email: string) => {
    if (!email) {
        menssage("E-mail inválido!", "E-mail está vazio.", "error")
        return false;
    }

    // Validação se possuí um "@".
    const parts = email.split("@");
    if (parts.length !== 2) {
        menssage("Erro", "E-mail inválido.", "error")
        return false;
    }

    // Validação se há pelo menos um caractere antes e depois do "@"
    const [localPart, domain] = parts;
    if (localPart.length === 0 || domain.length === 0) {
        menssage("Erro", "E-mail inválido.", "error")
        return false;
    }

    // Valida se o domínio contém pelo menos um ponto
    if (!domain.includes(".")) {
        menssage("Erro", "E-mail inválido.", "error")
        return false;
    }

    return true
}