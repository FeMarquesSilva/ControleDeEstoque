import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Header from "../components/ui/Header";

const Home = () => {

    const sections = ["Produtos", "Clientes", "Fornecedores"];

    return (
        <Box>
            <Header />
            <Flex
                flexDir={"column"}
                backgroundColor={"rgba(255, 226, 171, 1)"}
                w={"100%"} h={"100vh"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={"40px"}>

                {sections.map((info) => {
                    return (
                        <Box
                            backgroundColor={"rgba(223, 152, 0, 1)"}
                            w={"800px"} h={"150px"} textAlign={"center"} p={"5px"}
                            borderRadius={"15px"}
                            _hover={{ backgroundColor: "rgba(200, 130, 0, 1)", width: "840px", h: "160px" , cursor: "pointer" }}
                            key={info}
                            transition={"all 0.3s"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}>

                            <Text fontSize={"60px"}>{info}</Text>

                        </Box>
                    );
                })}

            </Flex>
        </Box>
    );
}

export default Home;