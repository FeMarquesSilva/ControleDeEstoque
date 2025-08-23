//Import de Bibliotecas;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";

//import de componentes;
import { user } from "./Interface";
import { validarEmail } from "../Functions";
import { handleResentPass } from "./Services";
import BTReturn from "../../components/ui/BTReturn";
import { menssage } from "../../components/ui/toastMenssage";
import { stylesInputs } from "../Styles";

const ResetPass = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ email, setEmail] = useState("")

    const handleSubmit = async () => {
        if (loading) return;
        setLoading(true);

        if (!validarEmail(email)) {
            setLoading(false);
            return;
        }

        try {
            const response = await handleResentPass(email);
            if (response) {
                menssage("Sucesso", `E-mail de redefinição enviado para ${email}`, "success");
                navigate("/");
            } else {
                menssage("Erro", "Falha ao enviar e-mail de redefinição!", "error");
                setLoading(false);
                return;
            }
        } catch (error) {
            menssage("Erro", "Falha ao enviar e-mail de redefinição!", "error");
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

                <Text fontSize={"18px"} mb={1} color={"white"}>E-mail:</Text>
                <Input
                    placeholder={"Digite seu e-mail"}
                    {...stylesInputs}
                    onChange={(e) => setEmail(e.target.value)}
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

export default ResetPass;
