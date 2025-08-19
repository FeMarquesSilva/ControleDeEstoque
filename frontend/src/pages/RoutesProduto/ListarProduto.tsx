//Import de Bibliotecas;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

//Import de Componentes;
import { Produto } from "./Interface";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { deleteProduto, fetchProdutos } from "./Services";
import { menssage } from "../../components/ui/toastMenssage";

const ListarProduto = () => {

    const navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchProdutos();
            if (response?.status === 200) {
                setProdutos(response.data);
            } else {
                menssage("Erro", "Erro ao buscar produtos. Tente novamente.", "error");
            }
        };
        fetchData();
    }, []);

    const handleDell = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                const response = await deleteProduto(id);

                if (response?.status === 200) {
                    menssage("Sucesso", "Produto excluído com sucesso!", "success");
                    setProdutos(produtos.filter(produto => produto.id !== id));
                } else {
                    menssage("Erro", "Erro ao excluir produto. Tente novamente.", "error");
                }
            } catch (error) {
                menssage("Erro", "Erro ao excluir produto. Tente novamente.", "error");
            }
        }
    }

    return (
        <Box>
            <Header tittle="Lista de Produtos" />
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
                        <Box flex="2">Nome</Box>
                        <Box flex="1">Descrição</Box>
                        <Box flex="1">SKU</Box>
                        <Box flex="1">UNM</Box>
                        <Box flex="1">Status</Box>
                        <Box flex="1">Fornecedor</Box>
                        <Box flex="1">Categoria</Box>
                        <Box flex="1.1">Ação</Box>
                    </Flex>

                    {/* Linhas de produtos */}
                    {produtos.map((produto, index) => (
                        <Flex
                            key={produto.id}
                            p={3}
                            bg={index % 2 === 0 ? 'rgba(173, 142, 84, 1)' : 'rgba(126, 118, 103, 1)'}
                            borderBottom="1px solid #eee"
                            gap={"50px"}
                            transition={'all 0.3s'}
                            _hover={{ backgroundColor: 'rgba(250, 218, 158, 0.8)', cursor: 'pointer' }}
                        >
                            <Box flex="1">{produto.id}</Box>
                            <Box w={"650px"} flex="2">{produto.nome}</Box>
                            <Box flex="2">{produto.descricao}</Box>
                            <Box flex="1">{produto.sku}</Box>
                            <Box flex="1">{produto.unidademedida}</Box>
                            <Box flex="1">{produto.status ? "Ativo" : "Inativo"}</Box>
                            <Box flex="1">{produto.fornecedor}</Box>
                            <Box flex="1">{produto.categoria}</Box>
                            <Flex gap={2} flex="1">
                                <Button
                                    backgroundColor={"rgba(62, 43, 143, 1)"}
                                    _hover={{ backgroundColor: "rgba(113, 100, 172, 1)" }}
                                    color={"white"}
                                    onClick={() => navigate(`/produtos/editar/${produto.id}`)}>
                                    Editar
                                </Button>
                                <Button
                                    backgroundColor={"rgba(141, 23, 23, 1)"}
                                    _hover={{ backgroundColor: "rgba(167, 80, 80, 1)" }}
                                    color={"white"}
                                    onClick={() => produto.id && handleDell(produto.id)}>
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

export default ListarProduto;