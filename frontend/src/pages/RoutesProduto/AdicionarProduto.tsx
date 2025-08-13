import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { useEffect, useState } from "react";
import React from "react";
import SelectFilter from "../../components/selectFilter";
import { optionSelect } from "./Interface";
import { fetchFornecedores } from "../RoutesFornecedor/Services";
import { Fornecedor } from "../RoutesFornecedor/Interfaces";
import { Categoria } from "../RoutsCategoria/Interfaces";
import { fetchCategorias } from "../RoutsCategoria/Services";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const AdicionarProduto = () => {
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = React.useState("");
    const [fornOptions, setFornOptions] = useState<optionSelect[]>([]);
    const [categoriaOptions, setCategoriaOptions] = useState<optionSelect[]>([])
    const [produto, setProduto] = useState({
        id: null,
        nome: "",
        cnpj: "",
        contato: "",
        endereco: "",
        email: "",
    });

    const submitForn = async () => {
        if (loading) return;
        setLoading(true);
    }

    useEffect(() => {
        const searchFornecedores = async () => {
            const response = await fetchFornecedores();

            if (response?.data.length > 0 && fornOptions.length === 0) {
                const novosItens = response?.data.map((fornecedor: Fornecedor) => ({
                    value: fornecedor.id ?? "",
                    label: fornecedor.nome,
                }));
                setFornOptions(novosItens);
            }
        };

        searchFornecedores();

        const searchCategorias = async () => {
            const response = await fetchCategorias();

            if (response?.data.length > 0 && categoriaOptions.length === 0) {
                const novosItens = response?.data.map((categoria: Categoria) => ({
                    value: categoria.id ?? "",
                    label: categoria.nome,
                }));
                setCategoriaOptions(novosItens);
            }
        };

        searchCategorias();

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
                        <Text>Nome</Text>
                        <input type={"text"} placeholder={"Nome do Produto"} style={stylesInputs}
                            onChange={(e) => setProduto({ ...produto, nome: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Descrição</Text>
                        <input type={"text"} placeholder={"Descrição do Produto"} style={stylesInputs}
                            onChange={(e) => setProduto({ ...produto, cnpj: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>SKU</Text>
                        <input type={"text"} placeholder={"SKU"} style={stylesInputs}
                            onChange={(e) => setProduto({ ...produto, contato: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Unidade de Medida</Text>
                        <input type={"text"} placeholder={"Unidade de Medida"} style={stylesInputs}
                            onChange={(e) => setProduto({ ...produto, endereco: e.target.value })} />
                    </Box>

                    { /* Select dos fornecedores cadastrados no banco */}
                    <Box>
                        <Text>Fornecedor</Text>

                        <SelectFilter
                            options={fornOptions}
                            value={selected}
                            onChange={setSelected}
                            placeholder="Fornecedor"
                        />
                    </Box>

                    { /* Select dos fornecedores cadastrados no banco */}
                    <Box>
                        <Text>Categoria</Text>

                        <SelectFilter
                            options={categoriaOptions}
                            value={selected}
                            onChange={setSelected}
                            placeholder="Categoria"
                        />
                    </Box>

                    <Button
                        mt={"15px"}
                        w={"100%"}
                        backgroundColor={"rgba(46, 126, 39, 1)"}
                        color={"white"}
                        transition={"all 0.3s"}
                        _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                        onClick={() => { submitForn() }}>{loading ? <Spinner /> : "Salvar"}</Button>
                </Flex>
            </Box>

        </Box>
    );
}

export default AdicionarProduto;