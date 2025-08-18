import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useEffect, useState } from "react";

import { fetchProdutoById, updateProduto } from "./Services";
import { useNavigate, useParams } from "react-router-dom";
import { menssage } from "../../components/ui/toastMenssage";
import { Produto } from "./Interface";
import { stylesInputs } from "../Styles";

const EditarProduto = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [produto, setProduto] = useState<Produto>({
        id: null,
        nome: "",
        descricao: "",
        sku: "",
        unidademedida: "",
        status: true,
        fornecedor_id: null,
        fornecedor: "",
        categoriaid: null,
        categoria: ""
    })

    const { id } = useParams<{ id: string }>();
    const searchProdutoById = async (id: number | null) => {
        await fetchProdutoById(id).then((response) => {
            if (response?.status === 200) {
                setProduto(response.data);
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
            searchProdutoById(Number(id));
        }
    }, [id]);

    const submitUptCliente = async () => {
        if (loading) return;
        setLoading(true);


        await updateProduto(produto).then((response) => {
            setLoading(false);
            if (response?.status === 200) {
                menssage("Sucesso", "Produto atualizado com sucesso!", "success");
                navigate(-1);
            } else {
                menssage("Erro", "Erro ao atualizar Produto. Tente novamente.", "error");
            }
        });

    }

    return (
        <Box>
            <Header tittle="Edição de Produto" />
            <BTReturn />

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                {produto.id === null ? <Text mt={"100px"} fontSize={"20px"} fontWeight={"bold"}>Carregando...</Text> :

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
                            <input type={"text"} placeholder={"Nome do Cliente"} value={produto.nome} style={stylesInputs}
                                onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>Descrição</Text>
                            <input type={"text"} placeholder={"Descrição"} value={produto.descricao} style={stylesInputs}
                                onChange={(e) => setProduto({ ...produto, descricao: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>SKU</Text>
                            <input type={"text"} placeholder={"SKU do Produto"} value={produto.sku} style={stylesInputs}
                                onChange={(e) => setProduto({ ...produto, sku: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>Unidade de Medida</Text>
                            <input type={"text"} placeholder={"Unidade de Medida"} value={produto.unidademedida} style={stylesInputs}
                                onChange={(e) => setProduto({ ...produto, unidademedida: e.target.value })} />
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

export default EditarProduto;