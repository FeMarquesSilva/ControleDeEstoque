import { Box, Color, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { menssage } from "../../components/ui/toastMenssage";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { EstoqueResumido } from "./Interfaces";
import { handlerBuscarLotesResumo, handlerListarEstoque } from "./Service";
import { formatDate } from "../Functions";

const ListarEstoqueResumo = () => {

    const [estoque, setEstoque] = useState<EstoqueResumido[]>([]);

    useEffect(() => {
        const searchEstoque = async () => {
            const response = await handlerBuscarLotesResumo();
            //Valido se deu suceeso o response:
            if (response?.status === 200) {
                setEstoque(response.data);
            } else {
                menssage("Erro", "Erro ao buscar estoque", "error");
            }
        }
        searchEstoque();
    }, [])

    return (
        <Box>
            <Header tittle="Lista do Estoque Resumido" />
            <BTReturn />

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Box mt={"50px"} mb={"50px"} border={"1px solid #ccc"} borderRadius="2px" textAlign={"center"}>
                    {/* Cabeçalho */}
                    <Flex backgroundColor={"rgba(146, 105, 29, 1)"} fontWeight="bold" p={3} borderBottom="1px solid #ccc" justifyContent="space-between" gap={"50px"}>
                        <Box flex="2" w={"450px"}>Nome do Produto</Box>
                        <Box flex="2">Data Validade</Box>
                        <Box flex="2">Categoria</Box>
                        <Box flex="2">Qtd. Produto</Box>
                        <Box flex="2">UN Medida</Box>
                    </Flex>

                    {/* Linhas de produtos */}
                    {estoque.map((estoque, index) => (
                        <Flex
                            key={index}
                            p={3}
                            bg={index % 2 === 0 ? 'rgba(173, 142, 84, 1)' : 'rgba(126, 118, 103, 1)'}
                            borderBottom="1px solid #eee"
                            gap={"50px"}
                            transition={'all 0.3s'}
                            _hover={{ backgroundColor: 'rgba(250, 218, 158, 0.8)', cursor: 'pointer' }}
                        >
                            <Box flex="2">{estoque.nome_produto}</Box>
                            <Box flex="2">{formatDate(estoque.data_validade)}</Box>
                            <Box flex="2">{estoque.categoria}</Box>
                            <Box
                                flex="2"
                                color={estoque.total_produto === 0 ? "red.500" : ""}
                                fontWeight={estoque.total_produto === 0 ? "bold" : ""}
                            >
                                {estoque.total_produto}
                            </Box>
                            <Box flex="2">{estoque.unidademedida}</Box>
                        </Flex>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ListarEstoqueResumo;