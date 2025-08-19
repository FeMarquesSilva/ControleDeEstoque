import { Fornecedor } from "./Interfaces"
import axios from "axios"

const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL;

// Função para enviar os dados do fornecedor para a API
export const handleSubmitFornecedor = async (fornecedor: Fornecedor) => {

    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(`${API_URL}/fornecedores/cadastro`, fornecedor, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }

}

// Função para buscar a lista de fornecedores da API
export const fetchFornecedores = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `${API_URL}/fornecedores`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // envia o token
                },
            }
        )
        return response
    } catch (error) {
        console.error(error)
        return
    }
}

// Função para buscar a lista de fornecedores com total de produtos fornecidos 
export const fetchFornecedoresProdutos = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `${API_URL}/fornecedores/produtos`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        )
        return response
    } catch (error) {
        console.error(error)
        return
    }
}

// Função para buscar a lista de fornecedores com total de produtos vendidos
export const fetchFornecedoresProdutosVendas = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `${API_URL}/fornecedores/produtos/vendas`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        )
        console.log(response.data)
        return response
    } catch (error) {
        console.error(error)
        return
    }
}


// Função para deletar um fornecedor da API
export const deleteFornecedor = async (id: number | null) => {
    try {
        const response = await axios.delete(`${API_URL}/fornecedores/${id}`, {
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
        const response = await axios.get(`${API_URL}/fornecedores/${id}`, {
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
        const response = await axios.put(`${API_URL}/fornecedores/${fornecedor.id}`, fornecedor, {
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