import { Categoria } from "./Interfaces"
import axios from "axios"

const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL;

// Função para cadastrar categoria;
export const handlerSubmitCategoria = async (categoria: Categoria) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${API_URL}/categorias`, categoria, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }

}

// Função para buscar todas as categorias;
export const handlerCategorias = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/categorias`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }
}

// Função para buscar uma categoria específica;
export const handlerCategoriaById = async (id: number | null) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/categorias/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }
}

// Função para atualizar uma categoria;
export const handlerUpdateCategoria = async (categoria: Categoria) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(`${API_URL}/categorias/${categoria.id}`, categoria, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        return response
    } catch (error) {
        console.error(error)
        return
    }
}