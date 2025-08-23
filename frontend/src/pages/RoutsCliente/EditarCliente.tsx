//Import de Bibliotecas;
import { withMask } from "use-mask-input";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";

//Import de Componentes;
import { Cliente } from "./Interfaces";
import { stylesInputs } from "../Styles";
import Header from "../../components/ui/Header";
import { validarCamposCliente } from "../Functions";
import BTReturn from "../../components/ui/BTReturn";
import { menssage } from "../../components/ui/toastMenssage";
import { fetchClienteById, updateCliente } from "./Services";

const EditarCliente = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cliente, setCliente] = useState<Cliente>({
        id: null,
        nome: "",
        cnpj: "",
        telefone: "",
        endereco: "",
        email: "",
    })

    const { id } = useParams<{ id: string }>();
    const searchClienteById = async (id: number | null) => {
        await fetchClienteById(id).then((response) => {
            if (response?.status === 200) {
                setCliente(response.data);
            } else {
                menssage("Erro", "Erro ao buscar cliente. Tente novamente.", "error");
            }
        }).catch((error) => {
            console.error(error);
            menssage("Erro", "Erro ao buscar cliente. Tente novamente.", "error");
        });
    }

    useEffect(() => {
        if (id) {
            searchClienteById(Number(id));
        }
    }, [id]);

    const submitUptCliente = async () => {
        if (loading) return;
        setLoading(true);

        if (!validarCamposCliente(cliente)) {
            setLoading(false)
            return
        }

        await updateCliente(cliente).then((response) => {
            setLoading(false);
            if (response?.status === 200) {
                menssage("Sucesso", "Cliente atualizado com sucesso!", "success");
                navigate(-1);
            } else {
                menssage("Erro", "Erro ao atualizar cliente. Tente novamente.", "error");
            }
        });

    }

    return (
        <Box>
            <Header tittle="Edição de Cliente" />
            <BTReturn />

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                {cliente.id === null ? <Text mt={"100px"} fontSize={"20px"} fontWeight={"bold"}>Carregando...</Text> :

                    <Flex
                        mt={"80px"}
                        backgroundColor={"rgba(177, 141, 75, 1)"}
                        flexDir={"column"}
                        p={"15px"}
                        borderRadius={"15px"}
                        gap={"5px"}>

                        <Text fontSize={"20px"} fontWeight={"bold"} color={"white"}>
                            Atualize os dados abaixo:
                        </Text>

                        <Box>
                            <Text>Nome</Text>
                            <input type={"text"} placeholder={"Nome do Cliente"} value={cliente.nome} style={stylesInputs}
                                onChange={(e) => setCliente({ ...cliente, nome: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>CNPJ</Text>
                            <input type={"text"}
                                ref={withMask("99.999.999/9999-99")}
                                placeholder={"00.000.000/0000-00"}
                                value={cliente.cnpj}
                                style={stylesInputs}
                                onChange={(e) => setCliente({ ...cliente, cnpj: e.target.value.replace(/\D/g, "") })} />
                        </Box>
                        <Box>
                            <Text>Telefone</Text>
                            <input type={"text"}
                                placeholder={"Telefone do Cliente"}
                                value={cliente.telefone}
                                style={stylesInputs}
                                ref={withMask("(99) 9 9999-9999")}
                                onChange={(e) => setCliente({ ...cliente, telefone: e.target.value.replace(/\D/g, "") })} />
                        </Box>
                        <Box>
                            <Text>Endereço</Text>
                            <input type={"text"} placeholder={"Endereço do Cliente"} value={cliente.endereco} style={stylesInputs}
                                onChange={(e) => setCliente({ ...cliente, endereco: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>Email</Text>
                            <input type={"email"} placeholder={"Email do Cliente"} value={cliente.email} style={stylesInputs}
                                onChange={(e) => setCliente({ ...cliente, email: e.target.value })} />
                        </Box>

                        <Button
                            mt={"15px"}
                            w={"100%"}
                            backgroundColor={"rgba(46, 126, 39, 1)"}
                            color={"white"}
                            transition={"all 0.3s"}
                            _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                            onClick={() => { submitUptCliente() }}>{loading ? <Spinner /> : "Salvar"}</Button>
                    </Flex>
                }
            </Box>
        </Box>
    );
};

export default EditarCliente;