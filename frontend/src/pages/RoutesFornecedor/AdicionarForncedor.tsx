import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useState } from "react";
import { Fornecedor } from "./Interfaces";
import { handleSubmitFornecedor } from "./Services";
import { menssage } from "../../components/ui/toastMenssage";
import { useNavigate } from "react-router-dom";
import { withMask } from "use-mask-input";
import { validarEmail } from "../Functions";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

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
    })

    const validarCampos = () => {
        if (fornecedor.nome === "") {
            menssage("Erro", "Preencha todos os campos!", "error")
            return false
        }
        if (fornecedor.cnpj === "") {
            menssage("Erro", "Preencha todos os campos!", "error")
            return false
        }
        if (fornecedor.cnpj.replace(/\D/g, "").length < 14) {
            menssage("Error", "CNPJ precisa ser completo", "error");
            return false;
        }
        if (fornecedor.contato === "") {
            menssage("Erro", "Preencha todos os campos!", "error")
            return false
        }
        if (fornecedor.endereco === "") {
            menssage("Erro", "Preencha todos os campos!", "error")
            return false
        }
        if (validarEmail(fornecedor.email) === false) {
            return false
        }
        return true
    }

    const submitForn = async () => {
        if (loading) return;
        setLoading(true);

        if (!validarCampos()) {
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
                        <input type={"text"}
                            ref={withMask("99.999.999/9999-99")}
                            placeholder={"00.000.000/0000-00"}
                            style={stylesInputs}
                            onChange={(e) => setFornecedor({ ...fornecedor, cnpj: e.target.value.replace(/\D/g, ""), })} />
                    </Box>
                    <Box>
                        <Text>Contato</Text>
                        <input type={"text"}
                            placeholder={"Contato do Fornecedor"}
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