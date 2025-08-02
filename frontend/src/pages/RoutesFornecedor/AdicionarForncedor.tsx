import { Box, Flex } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";

const AdicionarFornecedor = () => {
    return (
        <Box>
            <Header tittle="Cadastrar Fornecedor" />
            <BTReturn />

            { /* Componente do formulário para cadastro do produto */ }
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                
                <Flex mt={"80px"} backgroundColor={"rgba(172, 132, 59, 1)"} w={"600px"} h={"400px"} flexDir={"column"} p={"20px"} borderRadius={"15px"}>
                    
                </Flex>

            </Box>
        </Box>
    );
};

export default AdicionarFornecedor;