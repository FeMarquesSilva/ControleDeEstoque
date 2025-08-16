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
import { handlerEntradaEstoque } from "./Service";


const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const RealizarEntrada = () => {
    const navigate = useNavigate()
    const [fila, setFila] = useState<EntradaEstoque[]>([]);
    const [loading, setLoading] = useState(false);
    const [produto, setProduto] = useState<Produto[]>([])
    const [prodOptions, setProdOptions] = useState<optionSelect[]>([]);
    const [selectedProd, setSelectedProd] = React.useState("");
    const [entradaEstoque, setEntradaEstoque] = useState<EntradaEstoque>({
        quantidade: 0,
        validade: new Date(),
        produto_id: null,
        numero_lote: ""
    });

    useEffect(() => {
        const searchProdutos = async () => {
            const response = await fetchProdutos();
            setProduto(response?.data);

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

    const addEntradaFile = (newItem: EntradaEstoque) => {

        if (newItem.numero_lote === "" || newItem.produto_id === null || newItem.quantidade === 0){
            menssage("Erro", "Preencha todos os campos, e quantidade precisa ser positiva maior que zero!", "error")
            return
        }

        //Valida se o número de lote já está na lista pois não pode ser duplicado:
        const exist = fila.find((item) => item.numero_lote === newItem.numero_lote);
        if (exist) {
            menssage("Erro", "Número de lote já existe!", "error");
            return;
        }

        if (newItem.validade <= new Date()) {
            menssage("Erro", "Data de validade não pode ser menor ou igual a hoje!", "error");
            return;
        }

        setFila((prev) => [...prev, newItem]);
    };

    const limparFormulario = () => {
        setEntradaEstoque({
            quantidade: 0,
            validade: new Date(),
            produto_id: null,
            numero_lote: ""
        });
        setSelectedProd("");
    };

    const realizarEntradaEmFila = async () => {
        if (loading) return;
        setLoading(true);

        // Cria uma cópia da fila atual
        let filaLocal = [...fila];

        while (filaLocal.length > 0) {
            const item = filaLocal[0]; // pega o primeiro


            try {
                const response = await handlerEntradaEstoque(item);

                if (response?.status === 201) {
                    menssage("Sucesso", `Entrada do lote ${item.numero_lote} realizada com sucesso!`, "success");

                    // Atualiza estado removendo o primeiro
                    setFila(prev => prev.slice(1));

                    // Também remove da cópia local
                    filaLocal = filaLocal.slice(1);
                } else {
                    menssage("Erro", `Erro ao realizar entrada do lote ${item.numero_lote}!`, "error");
                    break;
                }
            } catch (err) {
                menssage("Erro", "Falha inesperada na entrada!", "error");
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        console.log("Limpando o formulário")
        limparFormulario();
        console.log(entradaEstoque)
        setLoading(false);
    };


    return (
        <Box>
            <Header tittle="Realizar Entrada no Estoque" />
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
                        <Text>Número do Lote</Text>
                        <input type={"text"} placeholder={"Número do Lote"} style={stylesInputs}
                            value={entradaEstoque.numero_lote}
                            onChange={(e) => setEntradaEstoque({ ...entradaEstoque, numero_lote: e.target.value })} />
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
                                    produto_id: Number(value) || null
                                }));
                            }}
                            placeholder="Selecione o Produto"
                        />
                    </Box>
                    <Box>
                        <Text>Validade</Text>
                        <input type={"date"} placeholder={"Data de Validade"} style={stylesInputs}
                            value={entradaEstoque.validade instanceof Date ? entradaEstoque.validade.toISOString().split('T')[0] : ""}
                            onChange={(e) => {
                                const [year, month, day] = e.target.value.split("-");
                                setEntradaEstoque({
                                    ...entradaEstoque,
                                    validade: new Date(Number(year), Number(month) - 1, Number(day)) // mês começa do 0
                                });
                            }} />
                    </Box>

                    <Box>
                        <Text>Quantidade</Text>
                        <input type={"text"} placeholder={"Quantidade do Produto"} style={stylesInputs}
                            value={entradaEstoque.quantidade}
                            onChange={(e) => setEntradaEstoque({ ...entradaEstoque, quantidade: Number(e.target.value) })} />
                    </Box>

                    <Button
                        mt={"15px"}
                        w={"100%"}
                        backgroundColor={"rgba(39, 77, 126, 1)"}
                        color={"white"}
                        transition={"all 0.3s"}
                        _hover={{ backgroundColor: "rgba(80, 103, 138, 1)" }}
                        onClick={() => { addEntradaFile(entradaEstoque) }}>Adicionar na fila
                    </Button>

                    <Button
                        mt={"15px"}
                        w={"100%"}
                        backgroundColor={"rgba(46, 126, 39, 1)"}
                        color={"white"}
                        transition={"all 0.3s"}
                        _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                        onClick={() => { realizarEntradaEmFila() }}>{loading ? <Spinner /> : "Salvar"}
                    </Button>
                </Flex>
            </Box>


            {fila.length !== 0 ?
                <Box
                    position={"absolute"}
                    right={0}
                    top={0}
                    mt={"100px"}
                    marginRight={"20px"}
                    backgroundColor={"rgba(177, 141, 75, 1)"}
                    w={"450px"}
                    borderRadius={"5px"}
                    maxH={"800px"} >

                    <Text textAlign={"center"} fontWeight={"bold"} fontSize={"25px"}>Fila de Lotes</Text>

                    <Box>
                        {fila.map((item, index) => {
                            return (
                                <Box
                                    key={index}
                                    backgroundColor={"rgba(51, 51, 51, 1)"}
                                    margin={"10px"}
                                    padding={"10px"}
                                    borderRadius={"6px"}
                                >
                                    <Text>Número do Lote: {item.numero_lote}</Text>
                                    <Text>Código do Produto: {item.produto_id}</Text>
                                    <Text>Nome do Produto: {produto.find((p) => p.id === item.produto_id)?.nome || "Desconhecido"}</Text>
                                    <Text>Data de Validade: {item.validade instanceof Date ? item.validade.toLocaleDateString() : String(item.validade)}</Text>
                                    <Text>Quantidade: {item.quantidade}</Text>
                                </Box>
                            );
                        })
                        }
                    </Box>

                </Box>
                : ""}

        </Box>
    );
}

export default RealizarEntrada;
