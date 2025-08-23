import React, { useEffect } from 'react';
import { Toaster } from "./components/ui/toaster";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";

//Importando o componentes do sistema:
import { menssage } from "./components/ui/toastMenssage";

//Auth;
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

//Principais;
import Home from './pages/Home';
import Fornecedor from './pages/Fornecedor';
import Clientes from './pages/Clientes';
import Categoria from "./pages/Categoria";
import Produto from './pages/Produto';
import Estoque from "./pages/Estoque";

//Cadastros;
import AdicionarProduto from "./pages/RoutesProduto/AdicionarProduto";
import AdicionarFornecedor from './pages/RoutesFornecedor/AdicionarForncedor';
import AdicionarCliente from "./pages/RoutsCliente/AdicionarCliente";
import AdicionarCategoria from "./pages/RoutsCategoria/AdicionarCategoria";
import AdicionarVenda from "./pages/RoutsCliente/RoutsVenda/AdicionarVenda";
import RealizarEntrada from "./pages/RoutesEstoque/RealizarEntrada";
import RealizarSaida from "./pages/RoutesEstoque/RealizarSaida";

//Edição;
import EditarFornecedor from "./pages/RoutesFornecedor/EditarFornecedor";
import EditarCliente from "./pages/RoutsCliente/EditarCliente";
import EditarProduto from "./pages/RoutesProduto/EditarProduto";
import EditarCategoria from "./pages/RoutsCategoria/EditarCategoria";

//Listagem;
import ListarFornecedores from "./pages/RoutesFornecedor/ListarFornecedores";
import ListarClientes from "./pages/RoutsCliente/ListarClientes";
import ListarCategorias from "./pages/RoutsCategoria/ListarCategoria";
import ListarProduto from "./pages/RoutesProduto/ListarProduto";
import ListarEstoque from "./pages/RoutesEstoque/ListarEstoque";
import ListarVendas from "./pages/RoutsCliente/RoutsVenda/ListarVendas";
import ListarEstoqueResumo from "./pages/RoutesEstoque/ListarEstoqueResumo";
import ListarVendasCliente from "./pages/RoutsCliente/RoutsVenda/ListarVendasCliente";
import ListarProdutosFornecedor from "./pages/RoutesFornecedor/ListarProdutosFornecedor";
import ListarFornecedorProdutoVenda from "./pages/RoutesFornecedor/ListarFornecedorProdutoVenda";

//Não encontrado;
import NotFound from "./pages/NotFound";
import axios from 'axios';

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        menssage("Usuário Inválido", "Você precisa estar logado.", "error");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_URL}/usuarios/token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data || response.data.valid === false) {
          throw new Error("Token inválido");
        }

      } catch (error) {
        menssage("Sessão Expirada", "Faça login novamente.", "error");
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    checkToken();
  }, [token, navigate]);

  return <>{element}</>;
};

// Definindo as rotas do aplicativo:
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: (<PrivateRoute element={<Home />} />) },
  { path: "/fornecedores", element: (<PrivateRoute element={<Fornecedor />} />) },
  { path: "/clientes", element: (<PrivateRoute element={<Clientes />} />) },
  { path: "/estoque", element: (<PrivateRoute element={<Estoque />} />) },
  { path: "/produtos", element: (<PrivateRoute element={<Produto />} />) },
  { path: "/categorias", element: (<PrivateRoute element={<Categoria />} />) },
  { path: "/produtos/adicionar", element: (<PrivateRoute element={<AdicionarProduto />} />) },
  { path: "/fornecedores/adicionar", element: (<PrivateRoute element={<AdicionarFornecedor />} />) },
  { path: "/clientes/adicionar", element: (<PrivateRoute element={<AdicionarCliente />} />) },
  { path: "/categorias/adicionar", element: (<PrivateRoute element={<AdicionarCategoria />} />) },
  { path: "/fornecedores/editar/:id", element: (<PrivateRoute element={<EditarFornecedor />} />) },
  { path: "/fornecedores/listar", element: (<PrivateRoute element={<ListarFornecedores />} />) },
  { path: "/clientes/editar/:id", element: (<PrivateRoute element={<EditarCliente />} />) },
  { path: "/clientes/listar", element: (<PrivateRoute element={<ListarClientes />} />) },
  { path: "/categorias/listar", element: (<PrivateRoute element={<ListarCategorias />} />) },
  { path: "/produtos/listar", element: (<PrivateRoute element={<ListarProduto />} />) },
  { path: "/estoque/entrada", element: (<PrivateRoute element={<RealizarEntrada /> } />) },
  { path: "/estoque/saida", element: (<PrivateRoute element={<RealizarSaida /> } />) },
  { path: "/clientes/venda", element: (<PrivateRoute element={<AdicionarVenda /> } />) },
  { path: "/estoque/listar", element: (<PrivateRoute element={<ListarEstoque />} />) },
  { path: "/clientes/venda/listar", element: (<PrivateRoute element={<ListarVendas />} />) },
  { path: "/estoque/listar/resumo", element: (<PrivateRoute element={<ListarEstoqueResumo />} />) },
  { path: "/clientes/vendas/listar/resumo", element: (<PrivateRoute element={<ListarVendasCliente />} />) },
  { path: "/fornecedores/produtos", element: (<PrivateRoute element={<ListarProdutosFornecedor />} />) },
  { path: "/fornecedores/produtos/vendas", element: (<PrivateRoute element={<ListarFornecedorProdutoVenda />} />) },
  { path: "/produtos/editar/:id", element: (<PrivateRoute element={<EditarProduto />} />) },
  { path: "/categorias/editar/:id", element: (<PrivateRoute element={<EditarCategoria />} />) },
  { path: "*", element: <NotFound /> },
]);

const App: React.FC = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Toaster />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;