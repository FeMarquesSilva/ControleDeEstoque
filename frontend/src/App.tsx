import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "./components/ui/toaster";
import React from 'react';

//Importando o componentes do sistema:
import Login from './pages/Login';
import Home from './pages/Home';

// Definindo as rotas do aplicativo:
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
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