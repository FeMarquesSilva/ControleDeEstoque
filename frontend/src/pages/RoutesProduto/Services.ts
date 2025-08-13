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