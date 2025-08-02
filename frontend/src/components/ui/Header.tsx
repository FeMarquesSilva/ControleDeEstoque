import { Box, Flex, Text } from "@chakra-ui/react";

const Header = () => {
    return (
        <Box w={"100%"} h={"80px"} backgroundColor={"rgba(170, 111, 0, 1)"}>
            <Flex textAlign={"center"} alignItems={"center"} justifyContent={"space-between"} h={"100%"} px={"20px"}>
                <Text fontSize={"24px"} fontWeight={"bold"} color={"white"}>Controle de Estoque</Text>
                <Box>
                    <Box 
                    w={"50px"} 
                    h={"50px"} 
                    borderRadius={"100%"} 
                    backgroundColor={"rgba(179, 179, 179, 1)"}
                    transition={"all 0.3s"}
                    _hover={{backgroundColor: "rgba(212, 212, 212, 1)", cursor: "pointer"}}></Box >
                </Box>
            </Flex>
        </Box>
    );
}

export default Header;