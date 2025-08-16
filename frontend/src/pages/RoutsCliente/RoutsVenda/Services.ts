import { Venda } from "./Interfaces";
import axios from "axios";

const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL;

// Função para criar nova venda
export const handleCreateVenda = async (venda: Venda) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${API_URL}/vendas`, venda, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
};

// Função para buscar todas as vendas
export const fetchVendas = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/vendas`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
};

// Função para listar todas as vendas
export const handleListVendas = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/vendas`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
};

// Função para deletar uma venda
export const handleDeleteVenda = async (vendaId: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(`${API_URL}/vendas/${vendaId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
};

// Função para listar vendas por cliente
export const handleListVendasPorCliente = async (clienteId: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/vendas/cliente/${clienteId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
};

// Função para listar vendas por produto
export const handleListVendasPorProduto = async (produtoId: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/vendas/produto/${produtoId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
};

// Função para listar vendas por data (formato string "YYYY-MM-DD")
export const handleListVendasPorData = async (data: string) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/vendas/data/${data}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return;
    }
};