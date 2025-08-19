//Import de Bibliotecas;
import { useState } from "react";
import { withMask } from "use-mask-input";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";

//Import de componentes;
import { stylesInputs } from "../Styles";
import { Fornecedor } from "./Interfaces";
import Header from "../../components/ui/Header";
import { handleSubmitFornecedor } from "./Services";
import BTReturn from "../../components/ui/BTReturn";
import { validarCamposFornecedor } from "../Functions";
import { menssage } from "../../components/ui/toastMenssage";

const AdicionarFornecedor = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [fornecedor, setFornecedor] = useState<Fornecedor>({
        id: null,
        nome: "",
        cnpj: "",
        contato: "",
        endereco: "",
        email: "",
        status: true
    })

    const submitForn = async () => {
        if (loading) return;
        setLoading(true);

        if (!validarCamposFornecedor(fornecedor)) {
            setLoading(false)
            return
        }

        await handleSubmitFornecedor(fornecedor).then((response) => {
            setLoading(false);
            if (response?.status === 201) {
                menssage("Sucesso", "Fornecedor cadastrado com sucesso!", "success");
                navigate("/fornecedores/listar")
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
                        <input type={"text"}
                            ref={withMask("99.999.999/9999-99")}
                            placeholder={"00.000.000/0000-00"}
                            style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, cnpj: e.target.value.replace(/\D/g, ""), })} />
                    </Box>
                    <Box>
                        <Text>Telefone</Text>
                        <input type={"text"}
                            placeholder={"Telefone do Fornecedor"}
                            style={stylesInputs}
                            ref={withMask("(99) 9 9999-9999")}
                            onChange={(e) => setFornecedor({ ...fornecedor, contato: e.target.value.replace(/\D/g, "") })} />
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
                        onClick={() => { submitForn() }}>{loading ? <Spinner /> : "Salvar"}</Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default AdicionarFornecedor;