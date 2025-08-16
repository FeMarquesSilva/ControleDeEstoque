import { Box, Button, Flex, Spinner, Text, Input } from "@chakra-ui/react";
import Header from "../../../components/ui/Header";
import BTReturn from "../../../components/ui/BTReturn";
import React, { useEffect, useState } from "react";
import { Venda } from "./Interfaces";
import { handleCreateVenda } from "./Services";
import { menssage } from "../../../components/ui/toastMenssage";
import { useNavigate } from "react-router-dom";
import { optionSelect, Produto } from "../../RoutesProduto/Interface";
import SelectFilter from "../../../components/selectFilter";
import { fetchProdutos } from "../../RoutesProduto/Services";
import { Cliente } from "../Interfaces";
import { fetchClientes } from "../Services";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const AdicionarVenda = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [prodOptions, setProdOptions] = useState<optionSelect[]>([]);
    const [clienteOptions, setClienteOptions] = useState<optionSelect[]>([]);
    const [selectedProd, setSelectedProd] = React.useState("");
    const [selectedCliente, setSelectedCliente] = React.useState("");

    const [venda, setVenda] = useState<Venda>({
        id: null,
        cliente_id: null,
        valor_total: 0,
        quantidade_total: 0,
        itens: [],
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

        const searchClientes = async () => {
            const response = await fetchClientes();
            if (response?.data.length > 0 && clienteOptions.length === 0) {
                const novosClientes = response?.data.map((cliente: Cliente) => ({
                    value: cliente.id ?? "",
                    label: cliente.nome,
                }));
                setClienteOptions(novosClientes);
            }
        };
        searchClientes();
    }, []);

    const [produto, setProduto] = useState({
        produto_id: null as number | null,
        nome: "",
        categoria: "",
        quantidade: 0,
        preco_unitario: 0,
        desconto_percent: 0,
    });

    const adicionarItem = () => {
        if (!produto.produto_id || produto.quantidade <= 0 || produto.preco_unitario <= 0) {
            menssage("Atenção", "Preencha os dados do produto corretamente.", "warning");
            return;
        }

        const subtotal = produto.quantidade * produto.preco_unitario;

        const novoItem = { ...produto, subtotal };
        const novosItens = [...venda.itens, novoItem];

        const quantidade_total = novosItens.reduce((acc, item) => acc + item.quantidade, 0);
        const valor_total = novosItens.reduce((acc, item) => acc + item.subtotal, 0);

        setVenda({ ...venda, itens: novosItens, quantidade_total, valor_total });

        setProduto({
            produto_id: null,
            nome: "",
            categoria: "",
            quantidade: 0,
            preco_unitario: 0,
            desconto_percent: 0,
        });
        setSelectedProd("");
    };

    const limparFormulario = () => {
        setProduto({
            produto_id: null,
            nome: "",
            categoria: "",
            quantidade: 0,
            preco_unitario: 0,
            desconto_percent: 0,
        });
        setSelectedProd("");
        setSelectedCliente("");
        setVenda((prev) => ({ ...prev, cliente_id: null }));
    };

    const submitVenda = async () => {
        if (loading) return;
        if (!venda.cliente_id || venda.itens.length === 0) {
            menssage("Atenção", "Informe o cliente e adicione pelo menos um produto.", "warning");
            return;
        }

        setLoading(true);

        try {
            const response = await handleCreateVenda(venda);
            setLoading(false);

            if (response?.status === 201) {
                menssage("Sucesso", "Venda cadastrada com sucesso!", "success");
                navigate("/vendas/listar");
            } else {
                menssage("Erro", "Erro ao cadastrar venda. Tente novamente.", "error");
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            menssage("Erro", "Erro ao cadastrar venda. Tente novamente.", "error");
        }
    };

    return (
        <Box>
            <Header tittle="Cadastrar Venda" />
            <BTReturn />

            <Flex mt="20px" justify="center" align="center">
                <Flex
                    mt="20px"
                    backgroundColor="rgba(177, 141, 75, 1)"
                    flexDir="column"
                    p="15px"
                    borderRadius="15px"
                    gap="5px"
                    width="500px"
                >
                    <Text fontSize="20px" fontWeight="bold" color="white">
                        Dados da Venda:
                    </Text>

                    <Box>
                        <Text>Cliente</Text>
                        <SelectFilter
                            options={clienteOptions}
                            value={selectedCliente}
                            onChange={(value) => {
                                setSelectedCliente(value);
                                setVenda((prev) => ({
                                    ...prev,
                                    cliente_id: Number(value) || null,
                                }));
                            }}
                            placeholder="Selecione o Cliente"
                        />
                    </Box>

                    <Box>
                        <Text>Produto</Text>
                        <SelectFilter
                            options={prodOptions}
                            value={selectedProd}
                            onChange={(value) => {
                                setSelectedProd(value);
                                setProduto((prev) => ({
                                    ...prev,
                                    produto_id: Number(value) || null,
                                }));
                            }}
                            placeholder="Selecione o Produto"
                        />
                    </Box>

                    <Text>Quantidade</Text>
                    <Input
                        type="text"
                        placeholder="Quantidade"
                        onChange={(e) => setProduto({ ...produto, quantidade: Number(e.target.value) })}
                        style={stylesInputs}
                    />
                    <Text>Preço Unitário</Text>
                    <Input
                        type="number"
                        placeholder="Preço Unitário"
                        onChange={(e) => setProduto({ ...produto, preco_unitario: Number(e.target.value) })}
                        style={stylesInputs}
                    />

                    <Flex mt="5px" gap="10px">
                        <Button
                            flex="1"
                            colorScheme="blue"
                            backgroundColor="rgba(53, 73, 248, 0.9)"
                            onClick={adicionarItem}
                        >
                            Adicionar Produto
                        </Button>
                        <Button
                            flex="1"
                            backgroundColor="rgba(172, 6, 6, 0.86)"
                            colorScheme="red"
                            onClick={limparFormulario}
                        >
                            Limpar Formulário
                        </Button>
                    </Flex>

                    {venda.itens.length > 0 && (
                        <Box mt="10px" background="rgba(75, 129, 82, 1)" borderRadius="10px" p="10px">
                            <Text fontWeight="bold">Produtos na Venda:</Text>
                            {venda.itens.map((item, index) => (
                                <Text key={index}>
                                    {item.nome} - {item.quantidade} x R${item.preco_unitario.toFixed(2)} = R${item.subtotal.toFixed(2)}
                                </Text>
                            ))}
                            <Text mt="10px" fontWeight="bold">
                                Total: {venda.quantidade_total} itens | R${venda.valor_total.toFixed(2)}
                            </Text>
                        </Box>
                    )}

                    <Button
                        mt="15px"
                        w="100%"
                        backgroundColor="rgba(46, 126, 39, 1)"
                        color="white"
                        onClick={submitVenda}
                    >
                        {loading ? <Spinner /> : "Salvar Venda"}
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};

export default AdicionarVenda;