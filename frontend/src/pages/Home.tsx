import { Box, Button, Flex, Text } from "@chakra-ui/react";


const Home = () => {

    const sections = ["Produtos", "Clientes", "Fornecedores"];
    
    return (
        <Flex 
        flexDir={"column"} 
        backgroundColor={"rgba(255, 226, 171, 1)"} 
        w={"100%"} h={"100vh"} 
        display={"flex"} 
        alignItems={"center"} 
        justifyContent={"center"} 
        gap={"20px"}>

            {sections.map((info) => {
                return (
                    <Box 
                    backgroundColor={"rgba(223, 152, 0, 1)"} 
                    w={"150px"} textAlign={"center"} p={"15px"} 
                    borderRadius={"15px"} 
                    _hover={{ backgroundColor: "rgba(200, 130, 0, 1)", padding: "20px", width: "170px", cursor: "pointer" }} 
                    key={info}
                    transition={"all 0.3s"}>

                        <Text>{info}</Text>

                    </Box>

                );
                })}
        </Flex>
    );
}

export default Home;