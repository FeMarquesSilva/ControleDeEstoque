import { Box, Flex, Text, Input } from "@chakra-ui/react";
import Header from "../../../components/ui/Header";
import BTReturn from "../../../components/ui/BTReturn";
import { useEffect, useState, useMemo } from "react";
import { Venda, ItemVenda } from "./Interfaces";
import { fetchVendasClientes } from "./Services";
import { fetchClientes } from "../Services";
import { fetchProdutos } from "../../RoutesProduto/Services";
import { menssage } from "../../../components/ui/toastMenssage";

interface Cliente {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
}

interface ItemVendaDetalhado extends ItemVenda {
  produto_nome: string;
  total: number;
}

interface VendaDetalhada extends Venda {
  cliente_nome: string;
  itensDetalhados: ItemVendaDetalhado[];
  totalVenda: number;
}

const ListarVendas = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroNF, setFiltroNF] = useState("");
  const [filtroProduto, setFiltroProduto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendasRes, clientesRes, produtosRes] = await Promise.all([
          fetchVendasClientes(),
          fetchClientes(),
          fetchProdutos(),
        ]);
        console.log(vendasRes?.data, clientesRes?.data, produtosRes?.data);
        if (vendasRes?.status === 200) setVendas(vendasRes.data);
        if (clientesRes?.status === 200) setClientes(clientesRes.data);
        if (produtosRes?.status === 200) setProdutos(produtosRes.data);
      } catch (error) {
        console.error(error);
        menssage("Erro", "Erro ao carregar dados. Tente novamente.", "error");
      }
    };

    fetchData();
  }, []);

  // Map detalhado para mostrar nomes e total
  const vendasDetalhadas: VendaDetalhada[] = useMemo(() => {
    return vendas.map((venda) => {
      const cliente_nome =
        clientes.find((c) => c.id === venda.cliente_id)?.nome || "Desconhecido";

      const itensDetalhados: ItemVendaDetalhado[] = (venda.itens || []).map(
        (item) => {
          const produto_nome =
            produtos.find((p) => p.id === item.produto_id)?.nome ||
            "Produto Desconhecido";
          return {
            ...item,
            produto_nome,
            total: item.quantidade * item.valorunitario,
          };
        }
      );

      const totalVenda = itensDetalhados.reduce(
        (acc, item) => acc + item.total,
        0
      );

      return {
        ...venda,
        cliente_nome,
        itensDetalhados,
        totalVenda,
      };
    });
  }, [vendas, clientes, produtos]);

  // Filtragem dinâmica por input
  const vendasFiltradas = useMemo(() => {
    return vendasDetalhadas
      .filter((v) =>
        filtroCliente
          ? v.cliente_nome.toLowerCase().includes(filtroCliente.toLowerCase())
          : true
      )
      .filter((v) =>
        filtroNF ? v.numeronf.toString().includes(filtroNF) : true
      )
      .filter((v) =>
        filtroProduto
          ? v.itensDetalhados.some((i) =>
              i.produto_nome.toLowerCase().includes(filtroProduto.toLowerCase())
            )
          : true
      );
  }, [vendasDetalhadas, filtroCliente, filtroNF, filtroProduto]);

  return (
    <Box>
      <Header tittle="Lista de Vendas" />
      <BTReturn />
      <Flex direction="column" align="center" mt={4} width="100%">
        <Text fontSize="2xl" mb={4}>
          Lista de Vendas
        </Text>

        {/* Filtros com autocomplete */}
        <Flex gap={4} mb={4} flexWrap="wrap">
          <Input
            placeholder="Filtrar por Cliente"
            value={filtroCliente}
            onChange={(e) => setFiltroCliente(e.target.value)}
          />
          <Input
            placeholder="Filtrar por NF"
            value={filtroNF}
            onChange={(e) => setFiltroNF(e.target.value)}
          />
          <Input
            placeholder="Filtrar por Produto"
            value={filtroProduto}
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
            >
              <Text>
                <strong>Cliente:</strong> {venda.cliente_nome}
              </Text>
              <Text>
                <strong>Número NF:</strong> {venda.numeronf}
              </Text>

              {venda.itensDetalhados.length > 0 && (
                <Box mt={2} pl={2}>
                  <Text fontWeight="bold">Itens:</Text>
                  {venda.itensDetalhados.map((item, idxItem) => (
                    <Text key={idxItem}>
                      {item.produto_nome} - Qtde: {item.quantidade} - Unitário:{" "}
                      {item.valorunitario.toFixed(2)} - Total: {item.total.toFixed(2)}
                    </Text>
                  ))}
                  <Text fontWeight="bold" mt={1}>
                    Total da Venda: {venda.totalVenda.toFixed(2)}
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