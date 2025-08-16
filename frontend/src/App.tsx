import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { Box, ChakraProvider, defaultSystem, Flex, Spinner } from "@chakra-ui/react";
import { Toaster } from "./components/ui/toaster";
import React, { useEffect, useState } from 'react';

//Importando o componentes do sistema:
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Produto from './pages/Produto';
import AdicionarProduto from "./pages/RoutesProduto/AdicionarProduto";
import Fornecedor from './pages/Fornecedor';
import AdicionarFornecedor from './pages/RoutesFornecedor/AdicionarForncedor';
import ListarFornecedores from "./pages/RoutesFornecedor/ListarFornecedores";
import Clientes from './pages/Clientes';
import AdicionarCliente from "./pages/RoutsCliente/AdicionarCliente";
import EditarFornecedor from "./pages/RoutesFornecedor/EditarFornecedor";
import EditarCliente from "./pages/RoutsCliente/EditarCliente";
import ListarClientes from "./pages/RoutsCliente/ListarClientes";
import Estoque from "./pages/Estoque";
import { menssage } from "./components/ui/toastMenssage";
import AdicionarCategoria from "./pages/RoutsCategoria/AdicionarCategoria";
import Categoria from "./pages/Categoria";
import ListarCategorias from "./pages/RoutsCategoria/ListarCategoria";
import ListarProduto from "./pages/RoutesProduto/ListarProduto";
import RealizarEntrada from "./pages/RoutesEstoque/RealizarEntrada";
import NotFound from "./pages/NotFound";
import AdicionarVenda from "./pages/RoutsCliente/RoutsVenda/AdicionarVenda";
import ListarEstoque from "./pages/RoutesEstoque/ListarEstoque";

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        menssage('Usuário Inválido', 'Você precisa estar logado para acessar essa página.', 'error');
        navigate('/');
        return;
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
  { path: "/produtos", element: (<PrivateRoute element={<Produto />} />) },
  { path: "/produtos/adicionar", element: (<PrivateRoute element={<AdicionarProduto />} />) },
  { path: "/fornecedores", element: (<PrivateRoute element={<Fornecedor />} />) },
  { path: "/fornecedores/adicionar", element: (<PrivateRoute element={<AdicionarFornecedor />} />) },
  { path: "/clientes", element: (<PrivateRoute element={<Clientes />} />) },
  { path: "/fornecedores/listar", element: (<PrivateRoute element={<ListarFornecedores />} />) },
  { path: "/clientes/adicionar", element: (<PrivateRoute element={<AdicionarCliente />} />) },
  { path: "/fornecedores/editar/:id", element: (<PrivateRoute element={<EditarFornecedor />} />) },
  { path: "/clientes/editar/:id", element: (<PrivateRoute element={<EditarCliente />} />) },
  { path: "/clientes/listar", element: (<PrivateRoute element={<ListarClientes />} />) },
  { path: "/estoque", element: (<PrivateRoute element={<Estoque />} />) },
  { path: "/categorias/adicionar", element: (<PrivateRoute element={<AdicionarCategoria />} />) },
  { path: "/categorias", element: (<PrivateRoute element={<Categoria />} />) },
  { path: "/categorias/listar", element: (<PrivateRoute element={<ListarCategorias />} />) },
  { path: "/produtos/listar", element: (<PrivateRoute element={<ListarProduto />} />) },
  { path: "/estoque/entrada", element: (<PrivateRoute element={<RealizarEntrada /> } />) },
  { path: "/clientes/venda", element: (<PrivateRoute element={<AdicionarVenda /> } />) },
  { path: "/estoque/listar", element: (<PrivateRoute element={<ListarEstoque />} />) },
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