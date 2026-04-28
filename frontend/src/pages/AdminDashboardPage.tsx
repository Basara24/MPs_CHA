import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from '../api/client';

interface Kpis {
  totalVendas: number;
  receita: number;
  parcelasAtrasadas: number;
  terrenosDisponiveis: number;
  terrenosVendidos: number;
}

export function AdminDashboardPage() {
  const [kpis, setKpis] = useState<Kpis | null>(null);

  useEffect(() => {
    api.get<Kpis>('/dashboard/kpis').then((res) => setKpis(res.data));
  }, []);

  if (!kpis) return <p>Carregando dashboard...</p>;

  const chartData = [
    { name: 'Vendas', valor: kpis.totalVendas },
    { name: 'Atrasadas', valor: kpis.parcelasAtrasadas },
    { name: 'Disponíveis', valor: kpis.terrenosDisponiveis },
    { name: 'Vendidos', valor: kpis.terrenosVendidos },
  ];

  return (
    <section>
      <h2>Dashboard comercial</h2>
      <div className="grid">
        <article className="card">
          <h3>Total de vendas</h3>
          <p>{kpis.totalVendas}</p>
        </article>
        <article className="card">
          <h3>Receita</h3>
          <p>R$ {kpis.receita.toLocaleString('pt-BR')}</p>
        </article>
        <article className="card">
          <h3>Parcelas atrasadas</h3>
          <p>{kpis.parcelasAtrasadas}</p>
        </article>
      </div>

      <div className="card">
        <h3>Visão geral</h3>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" fill="#2f6fed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
