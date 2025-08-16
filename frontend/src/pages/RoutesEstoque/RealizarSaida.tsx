import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import React, { useEffect, useState } from "react";
import { menssage } from "../../components/ui/toastMenssage";
import { optionSelect } from "../RoutesProduto/Interface";
import SelectFilter from "../../components/selectFilter";
import { DescartEstoque, Lote, VendaSaida } from "./Interfaces";
import { handlerBuscarLotes, handlerDescarteProduto } from "./Service";
import { formatDate } from "../Functions";
import { fetchVendas } from "../RoutsCliente/RoutsVenda/Services";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const RealizarSaida = () => {

    const [loading, setLoading] = useState(false);
    const [selectedMotiv, setSelectedMotiv] = React.useState("");
    const [selectedLote, setSelectedLote] = React.useState("");
    const [numLoteOptions, setNumLoteOptions] = useState<optionSelect[]>([]);
    const [numNfOptions, setNumNfOptions] = useState<optionSelect[]>([]);
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [vendas, setVendas] =useState<VendaSaida[]>([]);
    const [descarte, setDescarte] = useState<DescartEstoque>({
        id_lote: null,
        numero_lote: "",
        quantidade: null,
        motivo: "",
    });
    const [motivOptions, setMotivOptions] = useState<optionSelect[]>([
        { value: 1, label: "Descarte de Produto" },
        { value: 2, label: "Venda" },
    ]);

    useEffect(() => {
        const searchLotes = async () => {
            const response = await handlerBuscarLotes()
            setLotes(response?.data)

            if (response?.data.length > 0 && numLoteOptions.length === 0) {
                const novosItens = response?.data.map((lote: Lote) => ({
                    value: lote.id ?? "",
                    label: lote.numero_lote,
                }));
                setNumLoteOptions(novosItens);
            }

        }
        searchLotes()

        const searchVendas = async () => {
            const response = await fetchVendas()
            setVendas(response?.data)


        }
    }, [])

    const preencherNumLote = (value: string) => {
        const lote = lotes.find((l) => l.id === Number(value));

        setDescarte({
            ...descarte,
            id_lote: lote?.id || null,
            numero_lote: lote?.numero_lote || "",
        });

        setSelectedLote(value);
    };

    const preencherMotivo = (value: string) => {
        setSelectedMotiv(value)
        if (value === "1") {
            setDescarte({ ...descarte, motivo: "Descarte de Produto" })
        }
    }

    const limparFormulário = () => {
        setDescarte({
            ...descarte, 
            id_lote: null, 
            numero_lote: "",
            quantidade: null, 
            motivo: ""
        });
        setSelectedLote("");
        setSelectedMotiv("");
    }

    const finalizarSaida = async () => {
        if (loading) return;
        setLoading(true);

        if (descarte.quantidade === 0) {
            menssage("Erro", "Quantidade de produtos deve ser maior que 0", "error")
            setLoading(false);
            return;
        }

        try {
            if (selectedMotiv === "1") {

                const response = await handlerDescarteProduto(descarte);
                if (response?.status === 201) {
                    menssage("Sucesso", "Descarte realizado com sucesso", "success");
                } else if (response?.status === 404) {
                    menssage("Erro", "Lote não encontrado para descarte", "error");
                } else {
                    menssage("Erro", "Não foi possível realizar o descarte", "error");
                }
            }
        } catch (error) {
            console.error("Erro ao realizar descarte:", error);
            menssage("Erro", "Falha de comunicação com o servidor", "error");
        } finally {
            limparFormulário()
            setLoading(false);
        }
    };


    return (
        <Box>
            <Header tittle="Realizar Saída" />
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
                        <Text>Informe o Lote</Text>

                        <SelectFilter
                            options={numLoteOptions}
                            value={selectedLote}
                            placeholder="Número do Lote"
                            onChange={(value) => preencherNumLote(value)}
                        />
                    </Box>

                    <Box>
                        <Text>Motivo</Text>

                        <SelectFilter
                            options={motivOptions}
                            value={selectedMotiv}
                            placeholder="Escolha um Motivo"
                            onChange={(value) => preencherMotivo(value)}
                        />
                    </Box>

                    {selectedMotiv === "2" ?
                        <Box>
                            <Text>Número NF'e</Text>
                            <input type={"email"} placeholder={"Informe o npumero da NF'e"} style={stylesInputs}
                            //onChange={(e) => setFornecedor({ ...fornecedor, email: e.target.value })} 
                            />
                        </Box>
                        :
                        ""
                    }

                    {selectedMotiv === "1" ?
                        <Box>
                            <Text>Quantidade</Text>
                            <input type={"text"} placeholder={"Qtd. do Produto do Lote"} style={stylesInputs} value={Number(descarte.quantidade)}
                                onChange={(e) => setDescarte({ ...descarte, quantidade: Number(e.target.value) })}
                            />
                        </Box>
                        :
                        ""
                    }


                    <Button
                        mt={"15px"}
                        w={"100%"}
                        backgroundColor={"rgba(46, 126, 39, 1)"}
                        color={"white"}
                        transition={"all 0.3s"}
                        _hover={{ backgroundColor: "rgba(85, 138, 80, 1)" }}
                        onClick={() => { finalizarSaida() }}>{loading ? <Spinner /> : "Salvar"}</Button>
                </Flex>

                {selectedLote ?

                    <Box
                        position={"absolute"}
                        right={0}
                        top={0}
                        mt={"100px"}
                        marginRight={"20px"}
                        backgroundColor={"rgba(68, 131, 112, 1)"}
                        minW={"250px"}
                        padding={"5px"}
                        borderRadius={"8px"}
                    >
                        <Text fontWeight={"bold"}>Dados do Lote</Text>
                        <Text>Número do Lote: {lotes.find((l) => l.id === Number(selectedLote))?.numero_lote || "Não encontrado"}</Text>
                        <Text>Quantidade: {lotes.find((l) => l.id === Number(selectedLote))?.quantidade || "Não encontrado"}</Text>
                        <Text>
                            Data Validade: {
                                (() => {
                                    const validade = lotes.find((l) => l.id === Number(selectedLote))?.validade;
                                    if (!validade) return "Não encontrado";

                                    const date = new Date(validade);
                                    date.setDate(date.getDate() + 1); // Adiciona 1 dia; 

                                    return formatDate(date);
                                })()
                            }
                        </Text>
                    </Box>
                    :
                    ""
                }

            </Box>
        </Box>
    );
}

export default RealizarSaida;