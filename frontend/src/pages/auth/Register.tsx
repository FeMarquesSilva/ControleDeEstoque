//Import de Bibliotecas;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";

//import de componentes;
import { user } from "./Interface";
import { validarEmail } from "../Functions";
import { handleRegisterUser } from "./Services";
import BTReturn from "../../components/ui/BTReturn";
import { menssage } from "../../components/ui/toastMenssage";
import { stylesInputs } from "../Styles";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState<user>(
        {
            id: null,
            nome: null,
            email: "",
            senha: ""
        }
    );

    const validateData = () => {
        if (!usuario.email || !usuario.senha) {
            menssage("Erro", "Preencha todos os campos!", "error");
            setLoading(false);
            return false;
        } else if (usuario.senha.length < 6) {
            menssage("Erro", "Senha deve ter pelo menos 6 caracteres!", "error");
            setLoading(false);
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        if (loading) return;
        setLoading(true);

        if (!validateData()) return;

        if (!validarEmail(usuario.email)) {
            setLoading(false);
            return;
        }

        try {
            const response = await handleRegisterUser(usuario);
            if (response) {
                menssage("Sucesso", "Usuário cadastrado com sucesso!", "success");
                navigate("/");
            } else {
                menssage("Erro", "Falha ao cadastrar usuário!", "error");
                setLoading(false);
                return;
            }
        } catch (error) {
            menssage("Erro", "Ocorreu um erro ao cadastrar usuário!", "error");
        } finally {
            setLoading(false);
            return;
        }
    };

    return (
        <Flex w={"100%"} h={"100vh"} align={"center"} justify={"center"} backgroundColor={"rgba(32, 32, 32, 1)"}>

            <Box position={"absolute"} top={5} left={5}>
                <BTReturn />
            </Box>

            <Box
                bg={"#CC9E3A"}
                p={10}
                borderRadius={"20px"}
                boxShadow={"0 4px 12px rgba(0, 0, 0, 0.2)"}
                maxW={"400px"}
                w={"100%"}
            >

                <Text fontSize={"28px"} fontWeight={"bold"} textAlign={"center"} mb={6} color={"white"}>Cadastro de Usuário</Text>

                <Text fontSize={"18px"} mb={1} color={"white"}>Nome de Usuário:</Text>
                <Input
                    placeholder={"Digite Seu Nome Completo"}
                    {...stylesInputs}
                    onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
                />

                <Text fontSize={"18px"} mb={1} color={"white"}>E-mail:</Text>
                <Input
                    placeholder={"Digite seu e-mail"}
                    {...stylesInputs}
                    onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
                />

                <Text fontSize={"18px"} mb={1} color={"white"}>Senha:</Text>
                <Input
                    type={"password"}
                    placeholder={"Digite sua senha"}
                    {...stylesInputs}
                    onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
                />

                <Flex mt={"10px"}>
                    <Button
                        flex={1}
                        mt={2}
                        h={"36px"}
                        bg={loading ? "#819cbbff" : "#2c60a5ff"}
                        color={"white"}
                        _hover={{ bg: "#819cbbff" }}
                        onClick={() => handleSubmit()}
                    >
                        {loading ? <Spinner /> : "Finalizar Cadastro"}
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Register;
