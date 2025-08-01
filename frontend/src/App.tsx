import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "./components/ui/toaster";
import React, { useEffect } from 'react';

//Importando o componentes do sistema:
import Login from './pages/Login';

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
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
