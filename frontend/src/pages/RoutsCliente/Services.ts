import { Cliente } from "./Interfaces"
import axios from "axios"

export const handleSubmitCliente = async (cliente: Cliente) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/clientes`, cliente, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log("Resposta do servidor:", response);
        return response
    } catch (error) {
        console.error(error)
        return
    }

}