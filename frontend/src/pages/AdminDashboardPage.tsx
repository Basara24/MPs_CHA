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

  if (!kpis) {
    return (
      <section className="page-section">
        <div className="card loading-state">Carregando dashboard...</div>
      </section>
    );
  }

  const chartData = [
    { name: 'Vendas', valor: kpis.totalVendas },
    { name: 'Atrasadas', valor: kpis.parcelasAtrasadas },
    { name: 'Disponíveis', valor: kpis.terrenosDisponiveis },
    { name: 'Vendidos', valor: kpis.terrenosVendidos },
  ];

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard comercial</h2>
          <p className="page-subtitle">
            Acompanhe receita, performance de vendas e saude da carteira em tempo real.
          </p>
        </div>
      </div>

      <div className="grid">
        <article className="card card-hover">
          <h3>Total de vendas</h3>
          <p className="metric-value">{kpis.totalVendas}</p>
        </article>
        <article className="card card-hover">
          <h3>Receita</h3>
          <p className="metric-value">R$ {kpis.receita.toLocaleString('pt-BR')}</p>
        </article>
        <article className="card card-hover">
          <h3>Parcelas atrasadas</h3>
          <p className="metric-value">{kpis.parcelasAtrasadas}</p>
        </article>
        <article className="card card-hover">
          <h3>Terrenos vendidos</h3>
          <p className="metric-value">{kpis.terrenosVendidos}</p>
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
            <Bar dataKey="valor" fill="#2E7D32" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3>Resumo recente</h3>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
