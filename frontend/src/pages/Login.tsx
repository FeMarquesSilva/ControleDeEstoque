import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";

const Login = () => {
    return (
        <Flex flexDir={"column"} backgroundColor={"rgba(255, 226, 171, 1)"} w={"100%"} h={"100vh"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Flex flexDir={"row"} backgroundColor={"rgba(223, 152, 0, 1)"} p={"15px"} borderRadius={"15px"} alignItems={"center"}>

                <Flex flexDir={"column"} gap={"5px"}>
                    <Text textAlign={"center"} fontSize={"22px"} fontWeight={"bold"} mb={"10px"}>Login</Text>

                    <Text fontSize={"18px"}>Usuário: </Text>
                    <input type="text" placeholder="Digite seu e-mail" style={{ borderRadius: "10px", padding: "5px" }} />

                    <Text fontSize={"18px"}>Senha: </Text>
                    <input type="password" placeholder="Digite sua senha" style={{ borderRadius: "10px", padding: "5px" }} />
                    <Link fontSize={"16px"} mt={"5px"} fontWeight={"bold"}>Esqueci minha senha</Link>
                </Flex>

            </Flex>

            <Flex gap={"15px"} mt={"12px"}>
                <Button h={"30px"} backgroundColor={"rgba(44, 76, 165, 1)"} color={"white"}>Cadastrar</Button>
                <Button h={"30px"} backgroundColor={"rgba(82, 165, 44, 1)"} color={"white"}>Entrar</Button>
            </Flex>

        </Flex>
    );
}

export default Login;