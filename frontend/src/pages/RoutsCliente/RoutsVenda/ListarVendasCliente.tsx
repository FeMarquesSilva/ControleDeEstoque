import { Box, Color, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";


import { formatCurrency, formatDate } from "../../Functions";
import { menssage } from "../../../components/ui/toastMenssage";
import Header from "../../../components/ui/Header";
import BTReturn from "../../../components/ui/BTReturn";
import { handleListVendasCliente } from "./Services";
import { VendaPorCliente } from "./Interfaces";


const ListarVendasMensal = () => {

    const [vendas, setVendas] = useState<VendaPorCliente[]>([]);

    useEffect(() => {
        const searchEstoque = async () => {
            const response = await handleListVendasCliente();
            //Valido se deu suceeso o response:
            if (response?.status === 200) {
                setVendas(response.data);
            } else {
                menssage("Erro", "Erro ao buscar estoque", "error");
            }
        }
        searchEstoque();
    }, [])

    return (
        <Box>
            <Header tittle="Lista Vendas Total - Cliente" />
            <BTReturn />

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Box mt={"50px"} mb={"50px"} border={"1px solid #ccc"} borderRadius="2px" textAlign={"center"}>
                    {/* Cabeçalho */}
                    <Flex backgroundColor={"rgba(146, 105, 29, 1)"} fontWeight="bold" p={3} borderBottom="1px solid #ccc" justifyContent="space-between" gap={"50px"}>
                        <Box flex="2" w={"450px"}>Nome Cliente</Box>
                        <Box flex="2">Total Comprado</Box>
                    </Flex>

                    {/* Linhas de produtos */}
                    {vendas.map((venda, index) => (
                        <Flex
                            key={index}
                            p={3}
                            bg={index % 2 === 0 ? 'rgba(173, 142, 84, 1)' : 'rgba(126, 118, 103, 1)'}
                            borderBottom="1px solid #eee"
                            gap={"50px"}
                            transition={'all 0.3s'}
                            _hover={{ backgroundColor: 'rgba(250, 218, 158, 0.8)', cursor: 'pointer' }}
                        >
                            <Box flex="2">{venda.cliente}</Box>
                            <Box flex="2">{formatCurrency(venda.total_venda)}</Box>
                        </Flex>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ListarVendasMensal;