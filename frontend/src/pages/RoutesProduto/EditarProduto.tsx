//Import de Bibliotecas;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";

//Import de Componentes;
import { Produto } from "./Interface";
import { stylesInputs } from "../Styles";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { fetchProdutoById, updateProduto } from "./Services";
import { menssage } from "../../components/ui/toastMenssage";

const EditarProduto = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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

    //Valida se todos os campos de produto foram prenchidos, se não retorna menssagem e false:
    const validarProduto = () => {
        if (produto.nome === "" ||
            produto.descricao === "" ||
            produto.sku === "" ||
            produto.unidademedida === "" ||
            produto.fornecedor_id === null ||
            produto.categoriaid === null) {
            menssage("Erro", "Preencha todos os campos", "error");
            return false
        }
        return true;
    }

    const submitUptProduto = async () => {
        if (loading) return;
        setLoading(true);

        if (!validarProduto()){
            return 
        }

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
        <Box backgroundColor={"rgba(32, 32, 32, 1)"} color={"white"} minH={"100vh"}>
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
                            <Input type={"text"} placeholder={"Nome do Cliente"} value={produto.nome} {...stylesInputs}
                                onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>Descrição</Text>
                            <Input type={"text"} placeholder={"Descrição"} value={produto.descricao} {...stylesInputs}
                                onChange={(e) => setProduto({ ...produto, descricao: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>SKU</Text>
                            <Input type={"text"} placeholder={"SKU do Produto"} value={produto.sku} {...stylesInputs}
                                onChange={(e) => setProduto({ ...produto, sku: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>Unidade de Medida</Text>
                            <Input type={"text"} placeholder={"Unidade de Medida"} value={produto.unidademedida} {...stylesInputs}
                                onChange={(e) => setProduto({ ...produto, unidademedida: e.target.value })} />
                        </Box>

                        <Button
                            mt={"15px"}
                            w={"100%"}
                            backgroundColor={"rgba(46, 126, 39, 1)"}
                            color={"white"}
                            transition={"all 0.3s"}
                            _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                            onClick={() => { submitUptProduto() }}>{loading ? <Spinner /> : "Salvar"}</Button>
                    </Flex>
                }
            </Box>
        </Box>
    );
};

export default EditarProduto;