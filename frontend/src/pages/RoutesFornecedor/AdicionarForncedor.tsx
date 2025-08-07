import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useState } from "react";
import { Fornecedor } from "./Interfaces";
import { handleSubmitFornecedor } from "./Services";
import { menssage } from "../../components/ui/toastMenssage";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const AdicionarFornecedor = () => {

    const [loading, setLoading] = useState(false);
    const [fornecedor, setFornecedor] = useState<Fornecedor>({
        id: null,
        nome: "",
        cnpj: "",
        contato: "",
        endereco: "",
        email: "",
    })

    const submitForn = async () => {
        if (loading) return;
        setLoading(true);

        //Criar validação dos campo.

        await handleSubmitFornecedor(fornecedor).then((response) => {
            setLoading(false);
            if (response?.status === 201) {
                menssage("Sucesso", "Fornecedor cadastrado com sucesso!", "success");
            } else {
                menssage("Erro", "Erro ao cadastrar fornecedor. Tente novamente.", "error");
            }
        }).catch((error) => {
            console.error(error);
            setLoading(false);
            menssage("Erro", "Erro ao cadastrar fornecedor. Tente novamente.", "error");
        });

    }

    return (
        <Box>
            <Header tittle="Cadastrar Fornecedor" />
            <BTReturn />

            { /* Componente do formulário para cadastro do produto */}
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                <Flex
                    mt={"80px"}
                    backgroundColor={"rgba(177, 141, 75, 1)"}
                    flexDir={"column"}
                    p={"15px"}
                    borderRadius={"15px"}
                    gap={"5px"}>

                    <Text fontSize={"20px"} fontWeight={"bold"} color={"white"}>
                        Preencha os dados abaixo:
                    </Text>

                    <Box>
                        <Text>Nome</Text>
                        <input type={"text"} placeholder={"Nome do Fornecedor"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, nome: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>CNPJ</Text>
                        <input type={"text"} placeholder={"CNPJ do Fornecedor"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, cnpj: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Contato</Text>
                        <input type={"text"} placeholder={"Contato do Fornecedor"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, contato: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Endereço</Text>
                        <input type={"text"} placeholder={"Endereço do Fornecedor"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, endereco: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Email</Text>
                        <input type={"email"} placeholder={"Email do Fornecedor"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, email: e.target.value })} />
                    </Box>

                    <Button
                        mt={"15px"}
                        w={"100%"}
                        backgroundColor={"rgba(46, 126, 39, 1)"}
                        color={"white"}
                        transition={"all 0.3s"}
                        _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                        onClick={() => {submitForn()}}>{ loading ? <Spinner/> : "Salvar"}</Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default AdicionarFornecedor;