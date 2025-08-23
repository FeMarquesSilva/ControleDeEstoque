//Import de Bibliotecas;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Input, Link, Spinner, Text } from "@chakra-ui/react";

//Import de componentes;
import { user } from "./Interface";
import { handleLoginUser } from "./Services";
import { menssage } from "../../components/ui/toastMenssage";
import { stylesInputs } from "../Styles";

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

    try {

      const response = await handleLoginUser(usuario.email, usuario.senha);
      if (response.token) {
        localStorage.setItem("token", response.token);
        console.log("Redirece")
        navigate("/home")
      } else {
        menssage("Erro", "Credenciais inválidas!", "error");
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      setLoading(false);
      menssage("Erro", "Falha ao fazer login", "error");
    }
  };

  return (
    <Flex w={"100%"} h={"100vh"} align={"center"} justify={"center"} backgroundColor={"rgba(32, 32, 32, 1)"}>
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
          {...stylesInputs}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        />


        <Text fontSize={"18px"} mb={1} color={"white"}>Senha:</Text>
        <Input
          type={"password"}
          placeholder={"Digite sua senha"}
          {...stylesInputs}
          onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
        />

        <Link
          mt={2}
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
