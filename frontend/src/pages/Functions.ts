import { Cliente } from "./RoutsCliente/Interfaces";
import { menssage } from "../components/ui/toastMenssage";
import { Fornecedor } from "./RoutesFornecedor/Interfaces";

//Função para formatar data dd/mm/aaaa;
export const formatDate = (data: string | number | Date) => {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

//Função para formatar valores em reais R$0.000,00;
export const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

//Função para validar e-mail;
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

    // Valida se o domínio contém pelo menos um ponto;
    if (!domain.includes(".")) {
        menssage("Erro", "E-mail inválido.", "error")
        return false;
    }

    return true
}

// Função para validar Cliente;
export const validarCamposCliente = (cliente: Cliente) => {
    if (cliente.nome === "") {
        menssage("Error", "Preencha todos os campos!", "error")
        return false
    } else if (cliente.cnpj === "") {
        menssage("Error", "Preencha todos os campos!", "error")
        return false
    } else if (cliente.cnpj.replace(/\D/g, "").length < 14) {
        menssage("Error", "CNPJ precisa ser completo", "error");
        return false
    } else if (cliente.endereco === "") {
        menssage("Error", "Preencha todos os campos!", "error")
        return false
    } else if (cliente.telefone === "") {
        menssage("Error", "Preencha todos os campos!", "error")
        return false
    } else if (!validarEmail(cliente.email)) {
        return false
    } else {
        return true
    }
}

// Função para validar Fornecedor;
export const validarCamposFornecedor = (fornecedor: Fornecedor) => {
    if (fornecedor.nome === "") {
        menssage("Erro", "Preencha todos os campos!", "error")
        return false
    } else if (fornecedor.cnpj === "") {
        menssage("Erro", "Preencha todos os campos!", "error")
        return false
    } else if (fornecedor.cnpj.replace(/\D/g, "").length < 14) {
        menssage("Error", "CNPJ precisa ser completo", "error");
        return false;
    } else if (fornecedor.contato === "") {
        menssage("Erro", "Preencha todos os campos!", "error")
        return false
    } else if (fornecedor.endereco === "") {
        menssage("Erro", "Preencha todos os campos!", "error")
        return false
    } else if (validarEmail(fornecedor.email) === false) {
        return false
    } else {
        return true
    }
}