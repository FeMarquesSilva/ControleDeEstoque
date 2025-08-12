import { Box, Button, Flex, Input, Link, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "./Interface";
import { menssage } from "../../components/ui/toastMenssage";
import { handleLoginUser } from "./Services";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState<user>(
    {
      id: null,
      nome: null,
      email: "",
      senha: ""
    }
  );

  const validateData = () => {
    if (!usuario.email || !usuario.senha) {
      menssage("Erro", "Preencha todos os campos!", "error");
      setLoading(false);
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    if (!validateData()) return;
    const response = await handleLoginUser(usuario.email, usuario.senha);

    //Buscamos e armazenamos o token do firebase no localStorage do navegador para validações;
    const token: string = response.token;   
    localStorage.setItem("token", token);

    //Armazeno no localStorage o user:
    const user: user = response.user;
    localStorage.setItem("user", JSON.stringify(user));

    if (!response) {
      menssage("Erro", "Falha ao fazer login", "error");
      setLoading(false);
      return;
    }

    navigate("/home")
  };

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
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        />


        <Text fontSize={"18px"} mb={1} color={"white"}>Senha:</Text>
        <Input
          type={"password"}
          placeholder={"Digite sua senha"}
          borderRadius={"10px"}
          mb={2}
          bg={"black"}
          onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
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
            onClick={() => navigate("/register")}
          >
            Cadastrar
          </Button>
          <Button
            flex={1}
            h={"36px"}
            bg={loading ? "#83bb81ff" : "#52A52C"}
            color={"white"}
            _hover={{ bg: "#83bb81ff" }}
            onClick={() => handleLogin()}
          >
            {loading ? <Spinner /> : "Entrar"}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
