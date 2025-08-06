import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useState } from "react";
import { Fornecedor } from "./Interfaces";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const AdicionarFornecedor = () => {

    const [fornecedor, setFornecedor] = useState<Fornecedor>({
        nome: "",
        cnpj: "",
        contato: "",
        endereco: "",
        email: "",
    })

    const handleTeste = () => {
        console.log(fornecedor);
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
                        onClick={() => {handleTeste()}}>Salvar</Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default AdicionarFornecedor;