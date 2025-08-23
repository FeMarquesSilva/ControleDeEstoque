//Import de Bibliotecas;
import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

//Import de componentes;
import Header from "../../components/ui/Header";
import { FornecedorProduto } from "./Interfaces";
import BTReturn from "../../components/ui/BTReturn";
import { fetchFornecedoresProdutos } from "./Services";
import { menssage } from "../../components/ui/toastMenssage";

const ListarProdutosFornecedor = () => {
    const [fornecedores, setFornecedores] = useState<FornecedorProduto[]>([]);

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetchFornecedoresProdutos();
            if (response?.status === 200) {
                setFornecedores(response.data);
            } else {
                menssage("Erro", "Erro ao buscar fornecedores. Tente novamente.", "error");
            }
        };
        fetchData();
    }
        , []);


    return (
        <Box>
            <Header tittle="Lista de Produtos por Fornecedores" />
            <BTReturn />

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Box mt={"50px"} border={"1px solid #ccc"} borderRadius="2px" textAlign={"center"}>
                    {/* Cabeçalho */}
                    <Flex backgroundColor={"rgba(146, 105, 29, 1)"} fontWeight="bold" p={3} borderBottom="1px solid #ccc" justifyContent="space-between" gap={"50px"}>
                        <Box flex="2" w={"550px"}>Nome Fornecedor</Box>
                        <Box flex="2">Nome Produto</Box>
                        <Box flex="2">Total</Box>
                    </Flex>

                    {/* Linhas */}
                    {fornecedores.map((fornecedor, index) => (
                        <Flex
                            key={index}
                            p={3}
                            bg={index % 2 === 0 ? 'rgba(173, 142, 84, 1)' : 'rgba(126, 118, 103, 1)'}
                            borderBottom="1px solid #eee"
                            gap={"50px"}
                            transition={'all 0.3s'}
                            _hover={{ backgroundColor: 'rgba(250, 218, 158, 0.8)', cursor: 'pointer' }}
                        >
                            <Box flex="2">{fornecedor.nome_fornecedor}</Box>
                            <Box flex="2">{fornecedor.nome_produto}</Box>
                            <Box flex="2">{fornecedor.quantidade_total}</Box>
                        </Flex>
                    ))}
                </Box>


            </Box>

        </Box>
    );
};

export default ListarProdutosFornecedor;

