import { useEffect, useState } from 'react';
import { api } from '../api/client';

interface InadimplenciaResumo {
  total: number;
  itens: Array<{
    id: number;
    valor: number;
    dataVencimento: string;
    contrato: {
      cliente: { nome: string };
      terreno: { titulo: string };
    };
  }>;
}

export function RelatoriosPage() {
  const [resumo, setResumo] = useState<InadimplenciaResumo | null>(null);

  useEffect(() => {
    api.get<InadimplenciaResumo>('/pagamentos/inadimplencia/resumo').then((res) => {
      setResumo(res.data);
    });
  }, []);

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h2 className="page-title">Relatorios e financeiro</h2>
          <p className="page-subtitle">
            Exporte dados da operacao e acompanhe o fluxo de pagamentos pendentes.
          </p>
        </div>
      </div>

      <div className="card section-stack">
        <h3>Exportacoes</h3>
        <a
          className="button-secondary"
          href={`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/reports/vendas.csv`}
        >
          Baixar relatorio de vendas (CSV)
        </a>
        <a
          className="button-secondary"
          href={`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/reports/inadimplencia.csv`}
        >
          Baixar relatorio de inadimplencia (CSV)
        </a>
      </div>

      <div className="card">
        <h3>Parcelas em atraso: {resumo?.total ?? 0}</h3>
        {!resumo?.itens.length ? (
          <div className="empty-state">Nenhuma parcela em atraso no momento.</div>
        ) : (
          <table className="simple-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Terreno</th>
                <th>Valor</th>
                <th>Vencimento</th>
              </tr>
            </thead>
            <tbody>
              {resumo.itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.contrato.cliente.nome}</td>
                  <td>{item.contrato.terreno.titulo}</td>
                  <td>R$ {Number(item.valor).toLocaleString('pt-BR')}</td>
                  <td>{new Date(item.dataVencimento).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
