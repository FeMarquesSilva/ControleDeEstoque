//Import de Bibliotecas;
import { withMask } from "use-mask-input";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";

//Import de componentes;
import { stylesInputs } from "../Styles";
import { Fornecedor } from "./Interfaces";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { menssage } from "../../components/ui/toastMenssage";
import { fetchFornecedorById, updateFornecedor } from "./Services";
import { validarCamposFornecedor } from "../Functions";

const EditarFornecedor = () => {
    const navigate = useNavigate();
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

    const { id } = useParams<{ id: string }>();
    const searchForncedorById = async (id: number | null) => {
        await fetchFornecedorById(id).then((response) => {
            if (response?.status === 200) {
                setFornecedor(response.data);
            } else {
                menssage("Erro", "Erro ao buscar fornecedor. Tente novamente.", "error");
            }
        }).catch((error) => {
            console.error(error);
            menssage("Erro", "Erro ao buscar fornecedor. Tente novamente.", "error");
        });
    }

    useEffect(() => {
        if (id) {
            searchForncedorById(Number(id));
        }
    }, [id]);

    const submitUptForn = async () => {
        if (loading) return;
        setLoading(true);

        if (!validarCamposFornecedor(fornecedor)) {
            setLoading(false)
            return
        }

        await updateFornecedor(fornecedor).then((response) => {
            setLoading(false);
            if (response?.status === 200) {
                menssage("Sucesso", "Fornecedor atualizado com sucesso!", "success");
                navigate(-1);
            } else {
                menssage("Erro", "Erro ao atualizar fornecedor. Tente novamente.", "error");
            }
        });

    }

    return (
        <Box backgroundColor={"rgba(32, 32, 32, 1)"} color={"white"} minH={"100vh"}>
            <Header tittle="Edição de Fornecedor" />
            <BTReturn />

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                {fornecedor.id === null ? <Text mt={"100px"} fontSize={"20px"} fontWeight={"bold"}>Carregando...</Text> :

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
                            <Input type={"text"} placeholder={"Nome do Fornecedor"} value={fornecedor.nome} {...stylesInputs}
                                onChange={(e) => setFornecedor({ ...fornecedor, nome: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>CNPJ</Text>
                            <Input type={"text"}
                                ref={withMask("99.999.999/9999-99")}
                                placeholder={"00.000.000/0000-00"}
                                value={fornecedor.cnpj}
                                {...stylesInputs}
                                onChange={(e) => setFornecedor({ ...fornecedor, cnpj: e.target.value.replace(/\D/g, ""), })} />
                        </Box>
                        <Box>
                            <Text>Telefone</Text>
                            <Input type={"text"}
                                placeholder={"Telefone do Fornecedor"}
                                value={fornecedor.contato}
                                {...stylesInputs}
                                ref={withMask("(99) 9 9999-9999")}
                                onChange={(e) => setFornecedor({ ...fornecedor, contato: e.target.value.replace(/\D/g, "") })} />
                        </Box>
                        <Box>
                            <Text>Endereço</Text>
                            <Input type={"text"} placeholder={"Endereço do Fornecedor"} value={fornecedor.endereco} {...stylesInputs}
                                onChange={(e) => setFornecedor({ ...fornecedor, endereco: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>Email</Text>
                            <Input type={"email"} placeholder={"Email do Fornecedor"} value={fornecedor.email} {...stylesInputs}
                                onChange={(e) => setFornecedor({ ...fornecedor, email: e.target.value })} />
                        </Box>

                        <Button
                            mt={"15px"}
                            w={"100%"}
                            backgroundColor={"rgba(46, 126, 39, 1)"}
                            color={"white"}
                            transition={"all 0.3s"}
                            _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                            onClick={() => { submitUptForn() }}>{loading ? <Spinner /> : "Salvar"}</Button>
                    </Flex>
                }
            </Box>
        </Box>
    );
};

export default EditarFornecedor;