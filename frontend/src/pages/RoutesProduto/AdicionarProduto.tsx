//Import de Bibliotecas;
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";

//Import de componentes;
import { handlerProduto } from "./Services";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import { optionSelect, Produto } from "./Interface";
import { Categoria } from "../RoutsCategoria/Interfaces";
import SelectFilter from "../../components/selectFilter";
import { Fornecedor } from "../RoutesFornecedor/Interfaces";
import { handlerCategorias } from "../RoutsCategoria/Services";
import { menssage } from "../../components/ui/toastMenssage";
import { fetchFornecedores } from "../RoutesFornecedor/Services";
import { stylesInputs } from "../Styles";

const AdicionarProduto = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [selectedForn, setSelectedForn] = React.useState("");
    const [selectedCateg, setSelectedCateg] = React.useState("");
    const [fornOptions, setFornOptions] = useState<optionSelect[]>([]);
    const [categoriaOptions, setCategoriaOptions] = useState<optionSelect[]>([])
    const [produto, setProduto] = useState<Produto>({
        id: null,
        nome: "",
        descricao: "",
        sku: "",
        unidademedida: "",
        status: true,
        fornecedor_id: null,
        fornecedor: "",
        categoria: "",
        categoriaid: null
    });

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
            const response = await handlerCategorias();

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

    //Valida se todos os campos de produto foram prenchidos, se não retorna menssagem e false:
    const validarProduto = () => {
        if (produto.nome === "" ||
            produto.descricao === "" ||
            produto.sku === "" ||
            produto.unidademedida === "" ||
            produto.fornecedor_id === null ||
            produto.categoriaid === null) {
            menssage("Erro", "Preencha todos os campos", "error");
            return false
        }
        return true;
    }

    const submitForn = async () => {
        if (loading) return;
        setLoading(true);

        if (!validarProduto()) {
            setLoading(false)
            return
        }

        await handlerProduto(produto).then((response) => {
            setLoading(false);
            if (response?.status === 201) {
                menssage("Sucesso", "Produto cadastrado com sucesso!", "success");
                navigate('/produtos/listar')
            } else {
                menssage("Erro", "Erro ao cadastrar produto. Tente novamente.", "error");
            }
        }).catch((error) => {
            console.error(error);
            setLoading(false);
            menssage("Erro", "Erro ao cadastrar produto. Tente novamente.", "error");
        });

    }

    return (
        <Box>
            <Header tittle="Cadastrar Produto" />
            <BTReturn />

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
                            onChange={(e) => setProduto({ ...produto, descricao: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>SKU</Text>
                        <input type={"text"} placeholder={"SKU"} style={stylesInputs}
                            onChange={(e) => setProduto({ ...produto, sku: e.target.value })} />
                    </Box>
                    <Box>
                        <Text>Unidade de Medida</Text>
                        <input type={"text"} placeholder={"Unidade de Medida"} style={stylesInputs}
                            onChange={(e) => setProduto({ ...produto, unidademedida: e.target.value })} />
                    </Box>

                    { /* Select dos fornecedores cadastrados no banco */}
                    <Box>
                        <Text>Fornecedor</Text>

                        <SelectFilter
                            options={fornOptions}
                            value={selectedForn}
                            onChange={(value) => {
                                setSelectedForn(value);
                                setProduto((prev) => ({
                                    ...prev,
                                    fornecedor_id: Number(value) || null
                                }));
                            }}
                            placeholder="Fornecedor"
                        />
                    </Box>

                    { /* Select dos fornecedores cadastrados no banco */}
                    <Box>
                        <Text>Categoria</Text>

                        <SelectFilter
                            options={categoriaOptions}
                            value={selectedCateg}
                            onChange={(value) => {
                                setSelectedCateg(value);
                                setProduto((prev) => ({
                                    ...prev,
                                    categoriaid: Number(value) || null
                                }));
                            }}
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