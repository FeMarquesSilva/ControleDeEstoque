import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
    tittle: string
};

const Header = (props: Props) => {

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("token"); //Removo o token;
        navigate("/");
    };

    const userString = localStorage.getItem("user");
    const usuario = userString ? JSON.parse(userString) : null;

    const headerHeight = "80px";

    return (
        <Flex>
            <Box w={"100%"} h={"80px"} backgroundColor={"rgba(170, 111, 0, 1)"} position={"fixed"} top={0} left={0} zIndex={100}>
                <Flex textAlign={"center"} alignItems={"center"} justifyContent={"space-between"} h={"100%"} px={"20px"}>
                    <Text fontSize={"24px"} fontWeight={"bold"} color={"white"}>Controle de Estoque - {props.tittle}</Text>
                    <Box justifyItems={"right"} display={"flex"} alignItems={"center"} gap={"10px"}>
                        <Text fontSize={"18px"} fontWeight={"bold"} color={"white"}>Bem-vindo(a), {usuario.nome} ao sistema!</Text>
                        <Box
                            w={"50px"}
                            h={"50px"}
                            borderRadius={"100%"}
                            backgroundColor={"rgba(179, 179, 179, 1)"}
                            transition={"all 0.3s"}
                            _hover={{ backgroundColor: "rgba(212, 212, 212, 1)", cursor: "pointer" }}></Box >
                        <Icon
                            as={LogOut}
                            boxSize={8}
                            color={"white"}
                            transition={"all 0.3s"}
                            borderRadius={"8px"} p={"2px"}
                            backgroundColor={"rgba(170, 14, 14, 1)"}
                            _hover={{ backgroundColor: "rgba(173, 81, 81, 1)", cursor: "pointer" }}
                            onClick={() => handleLogOut()} />
                    </Box>
                </Flex>
                {/* Placeholder para ocupar o espaço do header */}
            </Box>
            <Box h={headerHeight} />
        </Flex>
    );
}

export default Header;