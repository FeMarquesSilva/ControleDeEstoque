import { Fornecedor } from "./Interfaces"
import axios from "axios"

export const handleSubmitFornecedor = async (fornecedor: Fornecedor) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/fornecedores`, fornecedor, {
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

export const fetchFornecedores = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/fornecedores`, {
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