import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduto, fetchProdutos } from "../RoutesProduto/Services";
import { menssage } from "../../components/ui/toastMenssage";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { ListaEstoque } from "./Interfaces";
import { handlerListarEstoque } from "./Service";

const ListarEstoque = () => {

    const [estoque, setEstoque] = useState<ListaEstoque[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const searchEstoque = async () => {
            const response = await handlerListarEstoque();
            setEstoque(response?.data);
        }

        searchEstoque();

    }, [])

    const formatDate = (data: string | number | Date) => {
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }



    return (
        <Box>
            <Header tittle="Lista do Estoque" />
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
                        <Box flex="2">Número Lote</Box>
                        <Box flex="2">Nome Produto</Box>
                        <Box flex="2">Qtd. Produto</Box>
                        <Box flex="2">Data Entrada</Box>
                        <Box flex="2">Data Validade</Box>
                        <Box flex="1">Categoria</Box>
                        <Box flex="2">Ação</Box>
                    </Flex>

                    {/* Linhas de produtos */}
                    {estoque.map((estoque, index) => (
                        <Flex
                            key={estoque.id}
                            p={3}
                            bg={index % 2 === 0 ? 'rgba(173, 142, 84, 1)' : 'rgba(126, 118, 103, 1)'}
                            borderBottom="1px solid #eee"
                            gap={"50px"}
                            transition={'all 0.3s'}
                            _hover={{ backgroundColor: 'rgba(250, 218, 158, 0.8)', cursor: 'pointer' }}
                        >
                            <Box flex="1">{estoque.id}</Box>
                            <Box flex="2">{estoque.numero_lote}</Box>
                            <Box flex="2" w={"450px"}>{estoque.nome_produto}</Box>
                            <Box flex="2">{estoque.qtd_produto}</Box>
                            <Box flex="2">{formatDate(estoque.data_entrada)}</Box>
                            <Box flex="2">{formatDate(estoque.data_validade)}</Box>
                            <Box flex="1" w={"200px"}>{estoque.categoria}</Box>
                            <Flex gap={2} flex="1">
                                <Button
                                    backgroundColor={"rgba(62, 43, 143, 1)"}
                                    _hover={{ backgroundColor: "rgba(113, 100, 172, 1)" }}
                                    color={"white"}
                                    onClick={() => navigate(`/produtos/editar/${estoque.id}`)}>
                                    Editar
                                </Button>
                                <Button
                                    backgroundColor={"rgba(141, 23, 23, 1)"}
                                    _hover={{ backgroundColor: "rgba(167, 80, 80, 1)" }}
                                    color={"white"}
                                    onClick={() => { }}>
                                    Excluir
                                </Button>
                            </Flex>
                        </Flex>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ListarEstoque;