import axios from "axios";
import { Produto } from "./Interface";

//Função para cadastrar Produto:
export const handlerProduto = async (produto: Produto) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/produtos/cadastro`, produto, {
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
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/produtos`, {
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
    const token = localStorage.getItem('token')
    try {
        const response = await axios.delete(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/produtos/${id}`, {
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