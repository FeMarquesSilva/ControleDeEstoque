import { Box, Flex, Text, Select as ChakraSelect } from "@chakra-ui/react";
import Header from "../../../components/ui/Header";
import BTReturn from "../../../components/ui/BTReturn";
import { useEffect, useState, useMemo } from "react";
import { Venda, ItemVenda } from "./Interfaces";
import { fetchVendas } from "./Services";
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
  id: number;
  cliente_nome: string;
  itensDetalhados: ItemVendaDetalhado[];
  totalVenda: number;
}

const ListarVendas = () => {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [filtroCliente, setFiltroCliente] = useState<number | "">("");
  const [filtroNF, setFiltroNF] = useState<number | "">("");
  const [filtroProduto, setFiltroProduto] = useState<number | "">("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vendasRes, clientesRes, produtosRes] = await Promise.all([
          fetchVendas(),
          fetchClientes(),
          fetchProdutos(),
        ]);

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
        id: venda.id ?? 0, // garante que id exista
        cliente_nome,
        itensDetalhados,
        totalVenda,
      };
    });
  }, [vendas, clientes, produtos]);

  const vendasFiltradas = useMemo(() => {
    return vendasDetalhadas
      .filter((v) => (filtroCliente ? v.cliente_id === filtroCliente : true))
      .filter((v) => (filtroNF ? v.numeronf === filtroNF : true))
      .filter((v) =>
        filtroProduto
          ? v.itensDetalhados.some((i) => i.produto_id === filtroProduto)
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

        {/* Filtros */}
        <Flex gap={4} mb={4}>
          <ChakraSelect
            placeholder="Filtrar por Cliente"
            value={filtroCliente}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFiltroCliente(e.target.value ? Number(e.target.value) : "")
            }
          >
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </ChakraSelect>

          <ChakraSelect
            placeholder="Filtrar por NF"
            value={filtroNF}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFiltroNF(e.target.value ? Number(e.target.value) : "")
            }
          >
            {Array.from(new Set(vendas.map((v) => v.numeronf))).map((nf) => (
              <option key={nf} value={nf}>
                {nf}
              </option>
            ))}
          </ChakraSelect>

          <ChakraSelect
            placeholder="Filtrar por Produto"
            value={filtroProduto}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFiltroProduto(e.target.value ? Number(e.target.value) : "")
            }
          >
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </ChakraSelect>
        </Flex>

        {vendasFiltradas.length === 0 ? (
          <Text>Nenhuma venda encontrada.</Text>
        ) : (
          vendasFiltradas.map((venda) => (
            <Box
              key={venda.id}
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
                  {venda.itensDetalhados.map((item, idx) => (
                    <Text key={idx}>
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