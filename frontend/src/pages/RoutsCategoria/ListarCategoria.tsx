import { Box, Button, Flex, Text} from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { menssage } from "../../components/ui/toastMenssage";
import { deleteCategoria, fetchCategorias } from "./Services";
import { Categoria } from "./Interfaces";

const ListarCategoria = () => {

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchCategorias();
            if (response?.status === 200) {
                setCategorias(response.data);
            } else {
                menssage("Erro", "Erro ao buscar categorias. Tente novamente.", "error");
            }
        };
        fetchData();
    }
        , []);

    const handleDelete = async (id: number | null) => {
        if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
            await deleteCategoria(id).then((response) => {
                if (response?.status === 200) {
                    menssage("Sucesso", "Categoria excluída com sucesso!", "success");
                    setCategorias(categorias.filter(categoria => categoria.id !== id));
                } else {
                    menssage("Erro", "Erro ao excluir categoria. Tente novamente.", "error");
                }
            }
            ).catch((error) => {
                console.error(error);
                menssage("Erro", "Erro ao excluir categoria. Tente novamente.", "error");
            });
        }
    }


    return (
        <Box>
            <Header tittle="Lista de Categorias" />
            <BTReturn />

            { /* Componente do formulário para cadastro da categoria */}
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
                        <Box flex="2">Descrição</Box>
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
                            <Box flex="2" w={"650px"}>{categoria.descricao}</Box>
                            <Flex gap={2} flex="1">
                                <Button
                                    backgroundColor={"rgba(62, 43, 143, 1)"}
                                    _hover={{ backgroundColor: "rgba(113, 100, 172, 1)" }}
                                    color={"white"}
                                    onClick={() => {navigate(`/categorias/editar/${categoria.id}`)}}>Editar</Button>
                                <Button
                                    backgroundColor={"rgba(141, 23, 23, 1)"}
                                    _hover={{ backgroundColor: "rgba(167, 80, 80, 1)" }}
                                    color={"white"}
                                    onClick={() => { handleDelete(categoria.id) }}>Excluir</Button>
                            </Flex>
                        </Flex>
                    ))}
                </Box>


            </Box>

        </Box>
    );
};

export default ListarCategoria;