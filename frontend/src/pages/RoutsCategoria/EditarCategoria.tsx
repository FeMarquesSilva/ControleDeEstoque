//Import de Bibliotecas;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Spinner, Text, Textarea } from "@chakra-ui/react";

//Import de Componentes;
import { Categoria } from "./Interfaces";
import { stylesInputs } from "../Styles";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { menssage } from "../../components/ui/toastMenssage";
import { handlerCategoriaById, handlerUpdateCategoria } from "./Services";

const EditarCategoria = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categoria, setCategoria] = useState<Categoria>({
        id: null,
        nome: "",
        descricao: "",
    })

    const { id } = useParams<{ id: string }>();
    const searchForncedorById = async (id: number | null) => {
        await handlerCategoriaById(id).then((response) => {
            if (response?.status === 200) {
                setCategoria(response.data);
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

        if (!categoria.nome.trim()) {
            menssage("Atenção", "O campo Nome é obrigatório.", "warning");
            return;
        }

        await handlerUpdateCategoria(categoria).then((response) => {
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
        <Box>
            <Header tittle="Edição de Fornecedor" />
            <BTReturn />

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                {categoria.id === null ? <Text mt={"100px"} fontSize={"20px"} fontWeight={"bold"}>Carregando...</Text> :

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
                            <input type={"text"} placeholder={"Nome da Categoria"} style={stylesInputs} value={categoria.nome}
                                onChange={(e) => setCategoria({ ...categoria, nome: e.target.value })} />
                        </Box>
                        <Box>
                            <Text>Descrição</Text>
                            <Textarea
                                style={stylesInputs}
                                placeholder="Descrição da Categoria"
                                maxLength={100}
                                minH="80px"
                                resize="vertical"
                                value={categoria.descricao}
                                onChange={(e) =>
                                    setCategoria({ ...categoria, descricao: e.target.value })
                                }
                            />
                            <Text fontSize="sm">
                                {categoria.descricao.length} / 100
                            </Text>
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

export default EditarCategoria;