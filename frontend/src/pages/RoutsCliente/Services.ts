import { Cliente } from "./Interfaces"
import axios from "axios"

export const handleSubmitCliente = async (cliente: Cliente) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/clientes`, cliente, {
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

// Função para buscar a lista de clientes da API
export const fetchClientes = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/clientes`, {
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

// Função para deletar um cliente da API
export const deleteCliente = async (id: number | null) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/clientes/${id}`, {
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

// Função para buscar um cliente específico da API
export const fetchClienteById = async (id: number | null) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/clientes/${id}`, {
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

// Função para atualizar um cliente na API
export const updateCliente = async (cliente: Cliente) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/clientes/${cliente.id}`, cliente, {
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