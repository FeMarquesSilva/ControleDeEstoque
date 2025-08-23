import { Cliente } from "./Interfaces"
import axios from "axios"

const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL;

export const handleSubmitCliente = async (cliente: Cliente) => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.post(`${API_URL}/clientes`, cliente, {
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

// Função para buscar a lista de clientes da API
export const fetchClientes = async () => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`${API_URL}/clientes`, {
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

// Função para buscar um cliente específico da API
export const fetchClienteById = async (id: number | null) => {
    try {
        const response = await axios.get(`${API_URL}/clientes/${id}`, {
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
        const response = await axios.put(`${API_URL}/clientes/${cliente.id}`, cliente, {
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