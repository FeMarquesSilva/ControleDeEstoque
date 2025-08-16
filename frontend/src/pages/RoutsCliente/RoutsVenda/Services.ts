import { Venda } from "./Interfaces"
import axios from "axios"

// função para criar nova venda
export const handleCreateVenda = async (venda: Venda) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/vendas`, venda, {
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

// função para listar vendas realizadas
export const handleListVendas = async () => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/vendas`, {
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

// função para deletar venda
export const handleDeleteVenda = async (vendaId: number) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.delete(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/vendas/${vendaId}`, {
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

// função para listar vendas por cliente
export const handleListVendasPorCliente = async (clienteId: number) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/vendas/cliente/${clienteId}`, {
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

// função para listar vendas por produto
export const handleListVendasPorProduto = async (produtoId: number) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/vendas/produto/${produtoId}`, {
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

// função para listar vendas por data
export const handleListVendasPorData = async (data: string) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/vendas/data/${data}`, {
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
