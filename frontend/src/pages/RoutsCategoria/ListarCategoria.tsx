import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex} from "@chakra-ui/react";

import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { menssage } from "../../components/ui/toastMenssage";
import { handlerCategorias } from "./Services";
import { Categoria } from "./Interfaces";

const ListarCategoria = () => {

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await handlerCategorias();
            if (response?.status === 200) {
                setCategorias(response.data);
            } else {
                menssage("Erro", "Erro ao buscar categorias. Tente novamente.", "error");
            }
        };
        fetchData();
    }
        , []);


    return (
        <Box backgroundColor={"rgba(32, 32, 32, 1)"} color={"white"} minH={"100vh"}>
            <Header tittle="Lista de Categorias" />
            <BTReturn />

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Box mt={"50px"} border={"1px solid #ccc"} borderRadius="2px" textAlign={"center"}>
                    {/* Cabeçalho */}
                    <Flex backgroundColor={"rgba(146, 105, 29, 1)"} fontWeight="bold" p={3} borderBottom="1px solid #ccc" justifyContent="space-between" gap={"50px"}>
                        <Box flex="1">ID</Box>
                        <Box flex="1">Nome</Box>
                        <Box flex="1">Descrição</Box>
                        <Box flex="1">Ações</Box>
                    </Flex>

                    {/* Linhas */}
                    {categorias.map((categoria, index) => (
                        <Flex
                            key={categoria.id}
                            p={3}
                            bg={index % 2 === 0 ? 'rgba(173, 142, 84, 1)' : 'rgba(126, 118, 103, 1)'}
                            borderBottom="1px solid #eee"
                            gap={"50px"}
                            transition={'all 0.3s'}
                            _hover={{ backgroundColor: 'rgba(250, 218, 158, 0.8)', cursor: 'pointer' }}
                        >
                            <Box flex="1">{categoria.id}</Box>
                            <Box flex="1">{categoria.nome}</Box>
                            <Box flex="1" w={"650px"}>{categoria.descricao}</Box>
                            <Flex flex="1" justifyContent={"center"}>
                                <Button
                                    backgroundColor={"rgba(62, 43, 143, 1)"}
                                    _hover={{ backgroundColor: "rgba(113, 100, 172, 1)" }}
                                    color={"white"}
                                    onClick={() => {navigate(`/categorias/editar/${categoria.id}`)}}>Editar</Button>
                            </Flex>
                        </Flex>
                    ))}
                </Box>


            </Box>

        </Box>
    );
};

export default ListarCategoria;