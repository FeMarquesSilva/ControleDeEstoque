import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.900"
      color="white"
      px={4}
    >
      <VStack>
        <Heading fontSize="6xl" color="red.400">
          404
        </Heading>
        <Text fontSize="xl">Oops! Página não encontrada.</Text>
        <Text fontSize="md" color="gray.400" textAlign="center" maxW="400px">
          A página que você está procurando pode ter sido removida ou está temporariamente indisponível.
        </Text>
        <Button
          colorScheme="teal"
          backgroundColor={"rgba(80, 0, 0, 1)"}
          onClick={() => navigate(-1)}
        >
          Voltar para a página inicial
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
