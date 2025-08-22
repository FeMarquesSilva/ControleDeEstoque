//Import de Bibliotecas;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Spinner, Text, Textarea } from "@chakra-ui/react";

//Import de componentes;
import Header from "../../components/ui/Header";
import { handlerSubmitCategoria } from "./Services";
import BTReturn from "../../components/ui/BTReturn";
import { menssage } from "../../components/ui/toastMenssage";
import { Categoria as CategoriaInterface } from "./Interfaces";
import { stylesInputs } from "../Styles";

const AdicionarCategoria = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [categoria, setCategoria] = useState<CategoriaInterface>({
        id: null,
        nome: "",
        descricao: ""
    });

    const submitCategoria = async () => {
        if (loading) return;

        if (!categoria.nome.trim()) {
            menssage("Atenção", "O campo Nome é obrigatório.", "warning");
            return;
        }

        setLoading(true);

        await handlerSubmitCategoria(categoria)
            .then((response) => {
                setLoading(false);
                if (response?.status === 201) {
                    menssage("Sucesso", "Categoria cadastrada com sucesso!", "success");
                    navigate('/categorias/listar')
                } else {
                    menssage("Erro", "Erro ao cadastrar categoria.", "error");
                }
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                menssage("Erro", "Erro ao cadastrar categoria. Tente novamente.", "error");
            });
    };

    return (
        <Box>
            <Header tittle="Cadastrar de Categoria" />
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
                        <input type={"text"} placeholder={"Nome da Categoria"} style={stylesInputs}
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
                        onClick={() => { submitCategoria() }}>{loading ? <Spinner /> : "Salvar"}</Button>
                </Flex>
            </Box>

        </Box>
    );
};

export default AdicionarCategoria;
