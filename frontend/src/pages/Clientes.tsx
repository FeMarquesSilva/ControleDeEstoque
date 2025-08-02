import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Header from '../components/ui/Header';
import BTReturn from '../components/ui/BTReturn';

const Clientes = () => {
    const navigate = useNavigate();
    const sections = [
        { nome: "Adicionar Cliente", link: "/clientes/adicionar" },
    ];
    return (
        <Box>
            <Header />
            <BTReturn />
           <Flex
                           flexDir={"column"}
                           w={"100%"} h={"100vh"}
                           display={"flex"}
                           alignItems={"center"}
                           justifyContent={"center"}
                           gap={"40px"}>
           
                           {sections.map((sec) => {
                               return (
                                   <Box
                                       backgroundColor={"rgba(223, 152, 0, 1)"}
                                       w={"800px"} h={"150px"} textAlign={"center"} p={"5px"}
                                       borderRadius={"15px"}
                                       _hover={{ backgroundColor: "rgba(200, 130, 0, 1)", width: "840px", h: "160px", cursor: "pointer" }}
                                       key={sec.nome}
                                       transition={"all 0.3s"}
                                       display={"flex"}
                                       alignItems={"center"}
                                       justifyContent={"center"}
                                       onClick={() => navigate(sec.link)}>
           
                                       <Text fontSize={"60px"}>{sec.nome}</Text>
                                   </Box>
                               );
                           })}
                       </Flex>
        </Box>
    );
}

export default Clientes;