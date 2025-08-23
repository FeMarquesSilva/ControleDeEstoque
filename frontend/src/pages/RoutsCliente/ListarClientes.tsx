//Import de Bibliotecas;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Text} from "@chakra-ui/react";

//Import de Componentes;
import { Cliente } from "./Interfaces";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { fetchClientes } from "./Services";
import { menssage } from "../../components/ui/toastMenssage";

const ListarClientes = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchClientes();
            if (response?.status === 200) {
                setClientes(response.data);
            } else {
                menssage("Erro", "Erro ao buscar clientes. Tente novamente.", "error");
            }
        };
        fetchData();
    }
        , []);

    return (
        <Box backgroundColor={"rgba(32, 32, 32, 1)"} color={"white"} minH={"100vh"}>
            <Header tittle="Lista de Clientes" />
            <BTReturn />

            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Box mt={"50px"} border={"1px solid #ccc"} borderRadius="2px" textAlign={"center"}>
                    {/* Cabeçalho */}
                    <Flex backgroundColor={"rgba(146, 105, 29, 1)"} fontWeight="bold" p={3} borderBottom="1px solid #ccc" justifyContent="space-between" gap={"50px"}>
                        <Box flex="1">ID</Box>
                        <Box flex="2">Nome</Box>
                        <Box flex="2">CNPJ</Box>
                        <Box flex="2">Email</Box>
                        <Box flex="2">Contato</Box>
                        <Box flex="3">Endereço</Box>
                        <Box flex="1">Ação</Box>
                    </Flex>

                    {/* Linhas */}
                    {clientes.map((cliente, index) => (
                        <Flex
                            key={cliente.id}
                            p={3}
                            bg={index % 2 === 0 ? 'rgba(173, 142, 84, 1)' : 'rgba(126, 118, 103, 1)'}
                            borderBottom="1px solid #eee"
                            gap={"50px"}
                            transition={'all 0.3s'}
                            _hover={{ backgroundColor: 'rgba(250, 218, 158, 0.8)', cursor: 'pointer' }}
                        >
                            <Box flex="1">{cliente.id}</Box>
                            <Box w={"650px"} flex="2">{cliente.nome}</Box>
                            <Box flex="2">{cliente.cnpj}</Box>
                            <Box flex="2">{cliente.email}</Box>
                            <Box flex="2">{cliente.telefone}</Box>
                            <Box flex="3">{cliente.endereco}</Box>
                            <Flex gap={2} flex="1" justifyContent={"center"}>
                                <Button
                                    backgroundColor={"rgba(62, 43, 143, 1)"}
                                    _hover={{ backgroundColor: "rgba(113, 100, 172, 1)" }}
                                    color={"white"}
                                    onClick={() => {navigate(`/clientes/editar/${cliente.id}`)}}>Editar</Button>
                            </Flex>
                        </Flex>
                    ))}
                </Box>


            </Box>

        </Box>
    );
};

export default ListarClientes;