import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useState } from "react";
import { Cliente } from "./Interfaces";
import { handleSubmitCliente } from "./Services";
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

const AdicionarCliente = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [cliente, setCliente] = useState<Cliente>({
        id: null,
        nome: "",
        cnpj: "",
        telefone: "",
        endereco: "",
        email: "",
    })

    const validarCampos = () => {
        if (cliente.nome === "") {
            menssage("Error", "Preencha todos os campos!", "error")
            return false
        } else if (cliente.cnpj === "") {
            menssage("Error", "Preencha todos os campos!", "error")
            return false
        } else if (cliente.cnpj.replace(/\D/g, "").length < 14) {
            menssage("Error", "CNPJ precisa ser completo", "error");
            return false
        } else if (cliente.endereco === "") {
            menssage("Error", "Preencha todos os campos!", "error")
            return false
        } else if (cliente.telefone === "") {
            menssage("Error", "Preencha todos os campos!", "error")
            return false
        } else if (!validarEmail(cliente.email)) {
            return false
        } else {
            return true
        }
    }

    const submitCliente = async () => {
        if (loading) return;
        setLoading(true);

        if (!validarCampos()) {
            setLoading(false)
            return
        }

        await handleSubmitCliente(cliente).then((response) => {
            setLoading(false);
            if (response?.status === 201) {
                menssage("Sucesso", "Cliente cadastrado com sucesso!", "success");
                navigate('/clientes/listar')
            } else {
                menssage("Erro", "Erro ao cadastrar cliente. Tente novamente.", "error");
            }
        }).catch((error) => {
            console.error(error);
            setLoading(false);
            menssage("Erro", "Erro ao cadastrar cliente. Tente novamente.", "error");
        });

    }

    return (
        <Box>
            <Header tittle="Cadastrar Cliente" />
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
                        <input type={"text"} placeholder={"Nome do Cliente"} style={stylesInputs}
                            onChange={(e) => setCliente({ ...cliente, nome: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>CNPJ</Text>
                        <input type={"text"}
                            ref={withMask("99.999.999/9999-99")}
                            placeholder={"00.000.000/0000-00"}
                            style={stylesInputs}
                            onChange={(e) => setCliente({ ...cliente, cnpj: e.target.value.replace(/\D/g, "") })} />
                    </Box>
                    <Box>
                        <Text>Telefone</Text>
                        <input type={"text"}
                            placeholder={"Telefone do Cliente"}
                            style={stylesInputs}
                            ref={withMask("(99) 9 9999-9999")}
                            onChange={(e) => setCliente({ ...cliente, telefone: e.target.value.replace(/\D/g, "") })} />
                    </Box>
                    <Box>
                        <Text>Endereço</Text>
                        <input type={"text"} placeholder={"Endereço do Cliente"} style={stylesInputs}
                            onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Email</Text>
                        <input type={"email"} placeholder={"Email do Cliente"} style={stylesInputs}
                            onChange={(e) => setCliente({ ...cliente, email: e.target.value })} />
                    </Box>

                    <Button
                        mt={"15px"}
                        w={"100%"}
                        backgroundColor={"rgba(46, 126, 39, 1)"}
                        color={"white"}
                        transition={"all 0.3s"}
                        _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                        onClick={() => { submitCliente() }}>{loading ? <Spinner /> : "Salvar"}</Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default AdicionarCliente;