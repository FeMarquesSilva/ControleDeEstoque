import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
            //Valido se deu suceeso o response:
            if (response?.status === 200) {
                setEstoque(response.data);
            } else {
                menssage("Erro", "Erro ao buscar estoque", "error");
            }
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
                        <Box flex="2">Categoria</Box>
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
                            <Box flex="2">{estoque.categoria}</Box>
                        </Flex>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ListarEstoque;