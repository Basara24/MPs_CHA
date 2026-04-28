import { useEffect, useState } from 'react';
import { api } from '../api/client';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

export function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    api.get<Cliente[]>('/users').then((res) => {
      setClientes(res.data.filter((item) => item.tipo === 'CLIENTE'));
    });
  }, []);

  return (
    <section>
      <h2>Gestão de clientes</h2>
      <div className="grid">
        {clientes.map((cliente) => (
          <article key={cliente.id} className="card">
            <h3>{cliente.nome}</h3>
            <p>{cliente.email}</p>
            <p>{cliente.tipo}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
