import { user } from "./Interface";
import axios from "axios";

// Função para cadastrar novo usuário enviando os dados do usuário para a API
export const handleRegisterUser = async (usuario: user) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/usuarios/cadastrar`, usuario, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error(error);
        return;
    }

};

// Função para fazer login do usuário
export const handleLoginUser = async (email: string, senha: string) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/usuarios/login`, { email, senha }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return;
    }
};
