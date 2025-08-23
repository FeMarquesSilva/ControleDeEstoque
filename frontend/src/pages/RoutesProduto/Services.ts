import axios from "axios";
import { Produto } from "./Interface";

const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL;
const token = localStorage.getItem('token')

//Função para cadastrar Produto:
export const handlerProduto = async (produto: Produto) => {
    try {
        const response = await axios.post(`${API_URL}/produtos/cadastro`, produto, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}

// Função para listar produtos
export const fetchProdutos = async () => {
    try {
        const response = await axios.get(`${API_URL}/produtos`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}

// Função para buscar produto por id
export const fetchProdutoById = async (id: number | null) => {
    try {
        const response = await axios.get(`${API_URL}/produtos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}

// Função para deletar produto
export const deleteProduto = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/produtos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}

// Função para atualizar produto
export const updateProduto = async (produto: Produto) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.put(`${API_URL}/produtos/${produto.id}`, produto, {
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