import { Categoria } from "./Interfaces"
import axios from "axios"

export const handleSubmitCategoria = async (categoria: Categoria) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/categorias`, categoria, {
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

// Função para buscar a lista de categorias da API
export const fetchCategorias = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/categorias`, {
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

// Função para deletar uma categoria da API
export const deleteCategoria = async (id: number | null) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/categorias/${id}`, {
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

// Função para buscar uma categoria específica da API
export const fetchCategoriaById = async (id: number | null) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/categorias/${id}`, {
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

// Função para atualizar uma categoria na API
export const updateCategoria = async (categoria: Categoria) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/categorias/${categoria.id}`, categoria, {
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