//Import de Bibliotecas;
import { useEffect, useState, useMemo } from "react";
import { Box, Flex, Text, Input } from "@chakra-ui/react";

//Import de Componentes;
import { stylesInputs } from "../../Styles";
import { VendasDetalhada } from "./Interfaces";
import { formatCurrency } from "../../Functions";
import Header from "../../../components/ui/Header";
import { handleListVendasDetalhada } from "./Services";
import BTReturn from "../../../components/ui/BTReturn";
import { menssage } from "../../../components/ui/toastMenssage";

const ListarVendas = () => {
  const [vendas, setVendas] = useState<VendasDetalhada[]>([]);
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroNF, setFiltroNF] = useState("");
  const [filtroProduto, setFiltroProduto] = useState("");

  useEffect(() => {
    const handleVendas = async () => {
      try {
        const response = await handleListVendasDetalhada()
        if (response?.status === 200) {
          setVendas(response.data);
        } else {
          menssage("Erro", "Erro ao buscar vendas.", "error");
        }
      } catch (error) {
        console.error(error);
        menssage("Erro", "Erro ao buscar vendas.", "error");
      }
    }
    handleVendas();
  }, []);

  const vendasFiltradas = useMemo(() => {
    return vendas
      // Filtro por cliente
      .filter((v) =>
        filtroCliente
          ? v.nome_cliente.toLowerCase().includes(filtroCliente.toLowerCase())
          : true
      )
      // Filtro por número da NF
      .filter((v) =>
        filtroNF
          ? v.numero_nf.toString().includes(filtroNF)
          : true
      )
      // Filtro por produto
      .filter((v) =>
        filtroProduto
          ? v.itens.some((i) =>
            i.produto.toLowerCase().includes(filtroProduto.toLowerCase())
          )
          : true
      );
  }, [vendas, filtroCliente, filtroNF, filtroProduto]);

  return (
    <Box backgroundColor={"rgba(32, 32, 32, 1)"} color={"white"} minH={"100vh"}>
      <Header tittle="Lista de Vendas" />
      <BTReturn />
      <Flex direction="column" align="center" mt={4} width="100%">
        <Text fontSize="2xl" mb={4}>
          Lista de Vendas
        </Text>

        <Flex gap={4} mb={4} flexWrap="wrap">
          <Input
            placeholder="Filtrar por Cliente"
            value={filtroCliente}
            {...stylesInputs}
            onChange={(e) => setFiltroCliente(e.target.value)}
          />
          <Input
            placeholder="Filtrar por NF"
            value={filtroNF}
            {...stylesInputs}
            onChange={(e) => setFiltroNF(e.target.value)}
          />
          <Input
            placeholder="Filtrar por Produto"
            value={filtroProduto}
            {...stylesInputs}
            onChange={(e) => setFiltroProduto(e.target.value)}
          />
        </Flex>

        {vendasFiltradas.length === 0 ? (
          <Text>Nenhuma venda encontrada.</Text>
        ) : (
          vendasFiltradas.map((venda, idxVenda) => (
            <Box
              key={idxVenda}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              mb={4}
              width="80%"
              backgroundColor={"rgba(20, 20, 20, 1)"}
              cursor={"pointer"}
              boxShadow="md"
              transition="all 0.3s"
              _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
            >
              <Text>
                <strong>Cliente:</strong> {venda.nome_cliente}
              </Text>
              <Text>
                <strong>Número NF:</strong> {venda.numero_nf}
              </Text>

              {venda.itens.length > 0 && (
                <Box mt={2} pl={2}>
                  <Text fontWeight="bold">Itens:</Text>
                  {venda.itens.map((item, idxItem) => (
                    <Text key={idxItem}>
                      {item.produto} - Qtde: {item.quantidade} - Unitário:{" "}
                      {formatCurrency(Number(item.valorunitario.toFixed(2)))} - Total: {formatCurrency(Number(item.valorunitario.toFixed(2)) * item.quantidade)}
                    </Text>
                  ))}
                  <Text fontWeight="bold" mt={1}>
                    Total da Venda: {formatCurrency(Number(venda.valor_total.toFixed(2)))}
                  </Text>
                </Box>
              )}
            </Box>
          ))
        )}
      </Flex>
    </Box>
  );
};

export default ListarVendas;