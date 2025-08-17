import axios from "axios";
import { DescartEstoque, EntradaEstoque, SaidaPorVenda } from "./Interfaces";

//Função para cadastrar nova entradaEstoque
export const handlerEntradaEstoque = async (entradaEstoque: EntradaEstoque) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/estoque/entrada`, entradaEstoque, {
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

//Função para listar o estoque:
export const handlerListarEstoque = async () => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/estoque`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}

//Função para buscar tofos lotes:
export const handlerBuscarLotes = async () => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/estoque/listar-lotes`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}

//Função para descarte de produto/lote:
export const handlerDescarteProduto = async (lote: DescartEstoque) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/estoque/descarte`, { lote },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}

//Função para realizar saida por venda:
export const handlerSaidaPorVenda = async (saida: SaidaPorVenda) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/estoque/saida-por-venda`, { saida },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error(error);
        return
    }
}