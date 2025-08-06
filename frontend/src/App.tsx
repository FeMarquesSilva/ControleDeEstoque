import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "./components/ui/toaster";
import React from 'react';

//Importando o componentes do sistema:
import Login from './pages/Login';
import Home from './pages/Home';
import Produto from './pages/Produto';
import AdicionarProduto from "./pages/RoutesProduto/AdicionarProduto";
import Fornecedor from './pages/Fornecedor';
import AdicionarFornecedor from './pages/RoutesFornecedor/AdicionarForncedor';
import ListarFornecedores from "./pages/RoutesFornecedor/ListarFornecedores";
import Clientes from './pages/Clientes';
import AdicionarCliente from "./pages/RoutsCliente/AdicionarCliente";
import EditarFornecedor from "./pages/RoutesFornecedor/EditarFornecedor";

// Definindo as rotas do aplicativo:
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/produtos", element: <Produto /> },
  { path: "/produtos/adicionar", element: <AdicionarProduto /> },
  { path: "/fornecedores", element: <Fornecedor /> },
  { path: "/fornecedores/adicionar", element: <AdicionarFornecedor /> },
  { path: "/clientes", element: <Clientes /> },
  { path: "/fornecedores/listar", element: <ListarFornecedores /> },
  { path: "/clientes/adicionar", element: <AdicionarCliente /> },
  { path: "/fornecedores/editar/:id", element: <EditarFornecedor /> },
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