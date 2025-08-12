import { Fornecedor } from "./Interfaces"
import axios from "axios"

// Função para enviar os dados do fornecedor para a API
export const handleSubmitFornecedor = async (fornecedor: Fornecedor) => {

    const userString = localStorage.getItem("user");
    const usuario = userString ? JSON.parse(userString) : null;

    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/fornecedores/cadastro`, {fornecedor, usuario}, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }

}

// Função para buscar a lista de fornecedores da API
export const fetchFornecedores = async (usuario_id: number) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/fornecedores`, { usuario_id }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }
}

// Função para deletar um fornecedor da API
export const deleteFornecedor = async (id: number | null) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/fornecedores/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }
}

// Função para buscar um fornecedor específico da API
export const fetchFornecedorById = async (id: number | null) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/fornecedores/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }
}

// Função para atualizar um fornecedor na API
export const updateFornecedor = async (fornecedor: Fornecedor) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/fornecedores/${fornecedor.id}`, fornecedor, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }
}