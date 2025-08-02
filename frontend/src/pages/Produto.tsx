import { Box, Button, Text } from "@chakra-ui/react";
import Header from "../components/ui/Header";
import { useNavigate } from "react-router-dom";

const Produto = () => {

    const navigate = useNavigate();

    return (
        <Box
            backgroundColor={"rgba(255, 226, 171, 1)"}
            w={"100%"} h={"100vh"}>
            <Header />
            <Box>
                <Button onClick={() => navigate(-1)}>Voltar para Home</Button>
                <Text color={"black"}>Produto Page</Text>
            </Box>
        </Box>
    );
}

export default Produto;