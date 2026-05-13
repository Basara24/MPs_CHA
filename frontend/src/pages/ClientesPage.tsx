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
  const [busca, setBusca] = useState('');

  useEffect(() => {
    api.get<Cliente[]>('/users').then((res) => {
      setClientes(res.data.filter((item) => item.tipo === 'CLIENTE'));
    });
  }, []);

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h2 className="page-title">Gestao de clientes</h2>
          <p className="page-subtitle">Visualize perfis, contatos e carteira de compradores.</p>
        </div>
      </div>
      <div className="card">
        <input
          placeholder="Buscar por nome ou e-mail"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>
      <div className="grid">
        {clientesFiltrados.map((cliente) => (
          <article key={cliente.id} className="card card-hover">
            <h3>{cliente.nome}</h3>
            <p>{cliente.email}</p>
            <span className="chip status-chip">{cliente.tipo}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
