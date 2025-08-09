import { Box, Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Flex w={"100%"} h={"100vh"} align={"center"} justify={"center"}>
      <Box
        bg={"#CC9E3A"}
        p={10}
        borderRadius={"20px"}
        boxShadow={"0 4px 12px rgba(0, 0, 0, 0.2)"}
        maxW={"400px"}
        w={"100%"}
      >
        <Text fontSize={"28px"} fontWeight={"bold"} textAlign={"center"} mb={6} color={"white"}>Login</Text>

        <Text fontSize={"18px"} mb={1} color={"white"}>Usuário:</Text>
        <Input
          placeholder={"Digite seu e-mail"}
          borderRadius={"10px"}
          mb={4}
          bg={"black"}
        />

        <Text fontSize={"18px"} mb={1} color={"white"}>Senha:</Text>
        <Input
          type={"password"}
          placeholder={"Digite sua senha"}
          borderRadius={"10px"}
          mb={2}
          bg={"black"}
        />

        <Link
          fontSize={"14px"}
          fontWeight={"bold"}
          color={"white"}
          _hover={{ textDecoration: "underline" }}
          display={"block"}
          mb={4}
        >
          Esqueci minha senha
        </Link>

        <Flex gap={4}>
          <Button
            flex={1}
            h={"36px"}
            bg={"#2C4CA5"}
            color={"white"}
            _hover={{ bg: "#223b84" }}
          >
            Cadastrar
          </Button>
          <Button
            flex={1}
            h={"36px"}
            bg={"#52A52C"}
            color={"white"}
            _hover={{ bg: "#3e8122" }}
            onClick={() => navigate("/home")}
          >
            Entrar
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
