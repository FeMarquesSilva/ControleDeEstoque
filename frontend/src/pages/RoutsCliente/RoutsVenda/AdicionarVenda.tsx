import { Box, Button, Flex, Spinner, Text, Input } from "@chakra-ui/react";
import Header from "../../../components/ui/Header";
import BTReturn from "../../../components/ui/BTReturn";
import React, { useEffect, useState } from "react";
import { ItemVenda, Venda } from "./Interfaces";
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
    backgroundColor: "#121212",
};

// Novo tipo para enviar ao backend
interface VendaPayload {
    cliente_id: number | null;
    numeronf: number;
    itens: ItemVenda[];
}

const AdicionarVenda = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [prodOptions, setProdOptions] = useState<optionSelect[]>([]);
    const [clienteOptions, setClienteOptions] = useState<optionSelect[]>([]);
    const [selectedProd, setSelectedProd] = useState("");
    const [selectedCliente, setSelectedCliente] = useState("");

    const [venda, setVenda] = useState<Venda>({
        cliente_id: null,
        numeronf: 0,
    });

    const [itensVenda, setItensVenda] = useState<ItemVenda[]>([]);
    const [quantidade, setQuantidade] = useState<number>(0);
    const [valorUnitario, setValorUnitario] = useState<number>(0);

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

    const adicionarItemVenda = () => {
        if (!selectedProd || quantidade <= 0 || valorUnitario <= 0) {
            menssage(
                "Atenção",
                "Selecione o produto e preencha quantidade e preço corretamente.",
                "warning"
            );
            return;
        }

        const novoItem: ItemVenda = {
            produto_id: Number(selectedProd),
            venda: null,
            quantidade,
            valorunitario: valorUnitario,
        };

        setItensVenda(prev => [...prev, novoItem]);

        // Resetar campos do produto
        setSelectedProd("");
        setQuantidade(0);
        setValorUnitario(0);
    };

    const limparFormulario = () => {
        setSelectedProd("");
        setQuantidade(0);
        setValorUnitario(0);
        setItensVenda([]);
    };

    const submitVenda = async () => {
        if (loading) return;
        if (!venda.cliente_id || itensVenda.length === 0) {
            menssage(
                "Atenção",
                "Informe o cliente e adicione pelo menos um produto.",
                "warning"
            );
            return;
        }

        setLoading(true);

        const vendaData: VendaPayload = {
            cliente_id: venda.cliente_id,
            numeronf: venda.numeronf,
            itens: itensVenda,
        };

        try {
            const response = await handleCreateVenda(vendaData);
            setLoading(false);

            if (response && response.status === 201) {
                menssage("Sucesso", "Venda cadastrada com sucesso!", "success");
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
                            onChange={(value) => setSelectedProd(value)}
                            placeholder="Selecione o Produto"
                        />
                    </Box>

                    <Box>
                        <Text>Numero NF'e</Text>
                        <Input
                            type="text"
                            placeholder="Numero NF'e"
                            value={venda.numeronf}
                            onChange={(e) => setVenda((prev) => ({ ...prev, numeronf: Number(e.target.value) }))}
                            style={stylesInputs}
                        />
                    </Box>

                    <Box>
                        <Text>Quantidade</Text>
                        <Input
                            type="number"
                            placeholder="Quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            style={stylesInputs}
                        />
                    </Box>

                    <Box>
                        <Text>Preço Unitário</Text>
                        <Input
                            type="number"
                            placeholder="Preço Unitário"
                            value={valorUnitario}
                            onChange={(e) => setValorUnitario(Number(e.target.value))}
                            style={stylesInputs}
                        />
                    </Box>

                    <Flex mt="5px" gap="10px">
                        <Button
                            flex="1"
                            colorScheme="blue"
                            backgroundColor="rgba(53, 73, 248, 0.9)"
                            onClick={adicionarItemVenda}
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