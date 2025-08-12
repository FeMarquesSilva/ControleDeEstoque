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

const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Para gerenciar o estado de carregamento

  const token = localStorage.getItem('token'); // Pegando o token do localStorage

  useEffect(() => {
    // Função para validar o token
    const checkToken = async () => {
      if (!token) {
        setLoading(false);
        navigate('/');
        return;
      }
    };

    checkToken();
  }, [token, navigate]);

  if (loading) {
    return <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
    >
      <Box mb={4}>Carregando...</Box>
      <Spinner size="xl" color="blue.900" />
    </Flex>; // Mostrar um carregando enquanto valida o token
  }

  return <>{element}</>; // Se o token for válido, renderiza a página protegida
};

// Definindo as rotas do aplicativo:
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: (<PrivateRoute element={<Home />} />) },
  { path: "/produtos", element: (<PrivateRoute element={<Produto />} />) },
  { path: "/produtos/adicionar", element: (<PrivateRoute element={<AdicionarProduto />} />) },
  { path: "/fornecedores", element: (<PrivateRoute element={ <Fornecedor />} />) },
  { path: "/fornecedores/adicionar", element: (<PrivateRoute element={ <AdicionarFornecedor />} />) },
  { path: "/clientes", element: (<PrivateRoute element={ <Clientes />} />) },
  { path: "/fornecedores/listar", element: (<PrivateRoute element={ <ListarFornecedores />} />) },
  { path: "/clientes/adicionar", element: (<PrivateRoute element={ <AdicionarCliente />} />) },
  { path: "/fornecedores/editar/:id", element: (<PrivateRoute element={ <EditarFornecedor />} />) },
  { path: "/clientes/editar/:id", element: (<PrivateRoute element={ <EditarCliente />} />) },
  { path: "/clientes/listar", element: (<PrivateRoute element={ <ListarClientes />} />) },
  { path: "/estoque", element: (<PrivateRoute element={ <Estoque />} />) },
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