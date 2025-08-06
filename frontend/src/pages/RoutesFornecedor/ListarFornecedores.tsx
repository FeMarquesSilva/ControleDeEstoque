import { Box, Flex, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useEffect, useState } from "react";
import { Fornecedor } from "./Interfaces";
import { fetchFornecedores } from "./Services";

const ListarFornecedores = () => {

    const [ fornecedores, setFornecedores ] = useState<Fornecedor[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchFornecedores();
            if (response?.status === 200) {
                setFornecedores(response.data);
            } else {
                alert("Erro ao buscar fornecedores. Tente novamente.");
            }
        };
        fetchData();
    }
    , []);

    return (
        <Box>
            <Header tittle="Lista de Fornecedores" />
            <BTReturn />

            { /* Componente do formulário para cadastro do produto */}
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                <Flex
                    mt={"80px"}
                    backgroundColor={"rgba(177, 141, 75, 1)"}
                    flexDir={"row"}
                    p={"15px"}
                    borderRadius={"15px"}
                    gap={"50px"}>

                    <Box>
                        <Text>Nome</Text>
                    </Box>
                    <Box>
                        <Text>CNPJ</Text>
                    </Box>
                    <Box>
                        <Text>Contato</Text>
                    </Box>
                    <Box>
                        <Text>Endereço</Text>
                    </Box>
                    <Box>
                        <Text>Email</Text>
                    </Box>
                </Flex>
            </Box>

        </Box>
    );
};

export default ListarFornecedores;

