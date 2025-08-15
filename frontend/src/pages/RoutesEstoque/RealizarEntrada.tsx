import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useEffect, useState } from "react";
import React from "react";
import SelectFilter from "../../components/selectFilter";
import { fetchFornecedores } from "../RoutesFornecedor/Services";
import { Fornecedor } from "../RoutesFornecedor/Interfaces";
import { Categoria } from "../RoutsCategoria/Interfaces";
import { fetchCategorias } from "../RoutsCategoria/Services";
import { menssage } from "../../components/ui/toastMenssage";
import { useNavigate } from "react-router-dom";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const RealizarEntrada = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [selectedForn, setSelectedForn] = React.useState("");
    const [selectedCateg, setSelectedCateg] = React.useState("");

    return (
        <Box>
            <Header tittle="Cadastrar Produto" />
            <BTReturn />

            { /* Componente do formulário para cadastro do produto */}
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
            >

                <Flex
                    mt={"80px"}
                    backgroundColor={"rgba(177, 141, 75, 1)"}
                    flexDir={"column"}
                    p={"15px"}
                    borderRadius={"15px"}
                    gap={"5px"}>

                    <Text fontSize={"20px"} fontWeight={"bold"} color={"white"}>
                        Preencha os dados abaixo:
                    </Text>

                    <Box>
                        <Text>Numero do Lote</Text>
                        <input type={"text"} placeholder={"Nome do Produto"} style={stylesInputs}/>
                    </Box>
                    <Box>
                        <Text>Produto</Text>
                        <input type={"text"} placeholder={"Descrição do Produto"} style={stylesInputs}/>
                    </Box>
                    <Box>
                        <Text>Validade</Text>
                        <input type={"text"} placeholder={"SKU"} style={stylesInputs} />
                    </Box>
                    <Box>
                        <Text>Quantidade</Text>
                        <input type={"text"} placeholder={"Unidade de Medida"} style={stylesInputs}/>
                    </Box>

                    <Button
                        mt={"15px"}
                        w={"100%"}
                        backgroundColor={"rgba(46, 126, 39, 1)"}
                        color={"white"}
                        transition={"all 0.3s"}
                        _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                        onClick={() => {  }}>{loading ? <Spinner /> : "Salvar"}</Button>
                </Flex>
            </Box>

        </Box>
    );
}

export default RealizarEntrada;