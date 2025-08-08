import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useState } from "react";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const AdicionarProduto = () => {
    const [loading, setLoading] = useState(false);
    const [fornecedor, setFornecedor] = useState({
        id: null,
        nome: "",
        cnpj: "",
        contato: "",
        endereco: "",
        email: "",
    });

    const submitForn = async () => {
        if (loading) return;
        setLoading(true);


    }

    return (
        <Box>
            <Header tittle="Cadastrar Produto" />
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
                        <input type={"text"} placeholder={"Nome do Produto"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, nome: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Descrição</Text>
                        <input type={"text"} placeholder={"Descrição do Produto"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, cnpj: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>SKU</Text>
                        <input type={"text"} placeholder={"SKU"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, contato: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Unidade de Medida</Text>
                        <input type={"text"} placeholder={"Unidade de Medida"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, endereco: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Fornecedor</Text>
                        <input type={"email"} placeholder={"Nome do Fornecedor"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, email: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Categoria</Text>
                        <input type={"email"} placeholder={"Categoria"} style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, email: e.target.value })} />
                    </Box>

                    <Button
                        mt={"15px"}
                        w={"100%"}
                        backgroundColor={"rgba(46, 126, 39, 1)"}
                        color={"white"}
                        transition={"all 0.3s"}
                        _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                        onClick={() => { submitForn() }}>{loading ? <Spinner /> : "Salvar"}</Button>
                </Flex>
            </Box>

        </Box>
    );
}

export default AdicionarProduto;