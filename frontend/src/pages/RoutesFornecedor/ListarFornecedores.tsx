import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useEffect, useState } from "react";
import { Fornecedor } from "./Interfaces";
import { deleteFornecedor, fetchFornecedores } from "./Services";
import { useNavigate } from "react-router-dom";

const ListarFornecedores = () => {

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchFornecedores();
            if (response?.status === 200) {
                setFornecedores(response.data);
            } else {
                alert("Erro ao buscar fornecedores. Tente novamente.");
            }
        };
        fetchData();
    }
        , []);

    const handleDell = async (id: number | null) => {
        if (window.confirm("Tem certeza que deseja excluir este fornecedor?")) {
            await deleteFornecedor(id).then((response) => {
                if (response?.status === 200) {
                    alert("Fornecedor excluído com sucesso!");
                    setFornecedores(fornecedores.filter(fornecedor => fornecedor.id !== id));
                } else {
                    alert("Erro ao excluir fornecedor. Tente novamente.");
                }
            }
            ).catch((error) => {
                console.error(error);
                alert("Erro ao excluir fornecedor. Tente novamente.");
            });
        }
    }


    return (
        <Box>
            <Header tittle="Lista de Fornecedores" />
            <BTReturn />

            { /* Componente do formulário para cadastro do produto */}
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
                        <Box flex="1.6">Ação</Box>
                    </Flex>

                    {/* Linhas */}
                    {fornecedores.map((fornecedor, index) => (
                        <Flex
                            key={fornecedor.id}
                            p={3}
                            bg={index % 2 === 0 ? 'rgba(173, 142, 84, 1)' : 'rgba(126, 118, 103, 1)'}
                            borderBottom="1px solid #eee"
                            gap={"50px"}
                            transition={'all 0.3s'}
                            _hover={{ backgroundColor: 'rgba(250, 218, 158, 0.8)', cursor: 'pointer' }}
                        >
                            <Box flex="1">{fornecedor.id}</Box>
                            <Box w={"650px"} flex="2">{fornecedor.nome}</Box>
                            <Box flex="2">{fornecedor.cnpj}</Box>
                            <Box flex="2">{fornecedor.email}</Box>
                            <Box flex="2">{fornecedor.contato}</Box>
                            <Box flex="3">{fornecedor.endereco}</Box>
                            <Flex gap={2} flex="1">
                                <Button
                                    backgroundColor={"rgba(62, 43, 143, 1)"}
                                    _hover={{ backgroundColor: "rgba(113, 100, 172, 1)" }}
                                    color={"white"}
                                    onClick={() => {navigate(`/fornecedores/editar/${fornecedor.id}`)}}>Editar</Button>
                                <Button
                                    backgroundColor={"rgba(141, 23, 23, 1)"}
                                    _hover={{ backgroundColor: "rgba(167, 80, 80, 1)" }}
                                    color={"white"}
                                    onClick={() => { handleDell(fornecedor.id) }}>Excluir</Button>
                            </Flex>
                        </Flex>
                    ))}
                </Box>


            </Box>

        </Box>
    );
};

export default ListarFornecedores;

