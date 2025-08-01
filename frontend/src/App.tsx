import React, { useEffect } from 'react';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

function App() {
  const [clientes, setClientes] = React.useState<Cliente[]>([]);

  const buscarClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/clientes');
      if (!response.ok) {
        throw new Error('Erro ao buscar clientes');
      }
      const data = await response.json();
      setClientes(data); // ✅ Aqui atualiza o estado
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  useEffect(() => {
    buscarClientes();
  }, []);

  return (
    <div>
      <header>
        <h1>Base do projeto</h1>
      </header>

      {clientes.length > 0 ? (
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.id}>
              {cliente.nome} - {cliente.email} - {cliente.telefone}
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há clientes cadastrados.</p>
      )}

      <button onClick={() => console.log(clientes)}>Ver dados no console</button>
    </div>
  );
}

export default App;
