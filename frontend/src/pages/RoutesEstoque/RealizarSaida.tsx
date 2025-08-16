import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";
import React, { useEffect, useState } from "react";
import { menssage } from "../../components/ui/toastMenssage";
import { optionSelect } from "../RoutesProduto/Interface";
import SelectFilter from "../../components/selectFilter";
import { DescartEstoque, Lote } from "./Interfaces";
import { handlerBuscarLotes } from "./Service";

const stylesInputs = {
    width: "100%",
    padding: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const RealizarSaida = () => {

    const [loading, setLoading] = useState(false);
    const [selectedMotiv, setSelectedMotiv] = React.useState("");
    const [lotes, setLotes] = useState<Lote[]>([]);
    const [descarte, setDescarte] = useState<DescartEstoque>({
        numero_lote: "",
        quantidade: null,
        motivo: "",
    });
    const [motivOptions, setMotivOptions] = useState<optionSelect[]>([
        { value: 1, label: "Descarte de Lote" },
        { value: 2, label: "Venda" },
    ]);

    useEffect(() => {
        const searchLotes = async () => {
            const response = await handlerBuscarLotes()
            setLotes(response?.data)
        }
        searchLotes()
    }, [])


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
                        <input type={"text"} placeholder={"Número do Lote"} style={stylesInputs}
                        //onChange={(e) => setFornecedor({ ...fornecedor, nome: e.target.value })} 
                        />
                    </Box>

                    <Box>
                        <Text>Motivo</Text>

                        <SelectFilter
                            options={motivOptions}
                            value={selectedMotiv}
                            placeholder="Escolha um Motivo"
                            onChange={(value) => setSelectedMotiv(value)}
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
                            <input type={"text"} placeholder={"Qtd. do Produto do Lote"} style={stylesInputs}
                            //onChange={(e) => setFornecedor({ ...fornecedor, cnpj: e.target.value })} 
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
                        onClick={() => { }}>{loading ? <Spinner /> : "Salvar"}</Button>
                </Flex>
            </Box>
        </Box>
    );
}

export default RealizarSaida;