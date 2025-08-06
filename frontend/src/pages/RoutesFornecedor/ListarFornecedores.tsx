import { Box, Flex, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";

const ListarFornecedores = () => {


    return (
        <Box>
            <Header tittle="Lista de Fornecedores" />
            <BTReturn />
            {/* Conteúdo da página de Listar Fornecedores */}


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

