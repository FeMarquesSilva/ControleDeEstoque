import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useEffect, useState } from "react";
import React from "react";
import SelectFilter from "../../components/selectFilter";
import { menssage } from "../../components/ui/toastMenssage";
import { useNavigate } from "react-router-dom";
import { optionSelect, Produto } from "../RoutesProduto/Interface";
import { fetchProdutos } from "../RoutesProduto/Services";
import { EntradaEstoque } from "./Interfaces";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const RealizarEntrada = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [prodOptions, setProdOptions] = useState<optionSelect[]>([]);
    const [selectedProd, setSelectedProd] = React.useState("");
    const [entradaEstoque, setEntradaEstoque] = useState<EntradaEstoque>({
        id: null,
        quantidade: 0,
        validade: new Date(),
        produto_id: null,
        numero_lote: ""
    });

    useEffect(() => {
        const searchProdutos = async () => {
            const response = await fetchProdutos();

            if (response?.data.length > 0 && prodOptions.length === 0) {
                const novosItens = response?.data.map((produto: Produto) => ({
                    value: produto.id ?? "",
                    label: produto.nome,
                }));
                setProdOptions(novosItens);
            }
        };

        searchProdutos();


    }, []);

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
                <Button onClick={() => {console.log(entradaEstoque)}}></Button>

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
                        <input type={"text"} placeholder={"Nome do Produto"} style={stylesInputs} />
                    </Box>
                    { /* Select dos fornecedores cadastrados no banco */}
                    <Box>
                        <Text>Produto</Text>

                        <SelectFilter
                            options={prodOptions}
                            value={selectedProd}
                            onChange={(value) => {
                                setSelectedProd(value);
                                setEntradaEstoque((prev) => ({
                                    ...prev,
                                    fornecedor_id: Number(value) || null
                                }));
                            }}
                            placeholder="Selecione o Produto"
                        />
                    </Box>
                    <Box>
                        <Text>Validade</Text>
                        <input type={"text"} placeholder={"Data de Validade"} style={stylesInputs} />
                    </Box>
                    <Box>
                        <Text>Quantidade</Text>
                        <input type={"text"} placeholder={"Quantidade do Produto"} style={stylesInputs} />
                    </Box>

                    <Button
                        mt={"15px"}
                        w={"100%"}
                        backgroundColor={"rgba(46, 126, 39, 1)"}
                        color={"white"}
                        transition={"all 0.3s"}
                        _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                        onClick={() => { }}>{loading ? <Spinner /> : "Salvar"}</Button>
                </Flex>
            </Box>

        </Box>
    );
}

export default RealizarEntrada;