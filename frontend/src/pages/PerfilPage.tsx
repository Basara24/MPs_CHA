import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';

interface ContratoItem {
  id: number;
  status: string;
  valorTotal: number;
  terreno: { titulo: string };
  pagamentos: { id: number; status: string; valor: number; dataVencimento: string }[];
  clienteId: number;
}

export function PerfilPage() {
  const { user } = useAuth();
  const [contratos, setContratos] = useState<ContratoItem[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<'dados' | 'compras' | 'contratos' | 'parcelas'>('dados');

  useEffect(() => {
    api.get<ContratoItem[]>('/contratos').then((res) => {
      const filtrados = res.data.filter((item) => item.clienteId === user?.sub);
      setContratos(filtrados);
    });
  }, [user?.sub]);

  const totalInvestido = contratos.reduce((acc, item) => acc + Number(item.valorTotal), 0);
  const parcelas = contratos.flatMap((contrato) =>
    contrato.pagamentos.map((pagamento) => ({
      ...pagamento,
      contratoId: contrato.id,
      terrenoTitulo: contrato.terreno.titulo,
    })),
  );

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h2 className="page-title">Perfil do cliente</h2>
          <p className="page-subtitle">Acompanhe seus dados, contratos e pagamentos em um so painel.</p>
        </div>
      </div>

      <div className="tabs">
        <button
          type="button"
          className={`tab-button ${abaAtiva === 'dados' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('dados')}
        >
          Dados pessoais
        </button>
        <button
          type="button"
          className={`tab-button ${abaAtiva === 'compras' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('compras')}
        >
          Compras realizadas
        </button>
        <button
          type="button"
          className={`tab-button ${abaAtiva === 'contratos' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('contratos')}
        >
          Contratos
        </button>
        <button
          type="button"
          className={`tab-button ${abaAtiva === 'parcelas' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('parcelas')}
        >
          Parcelas e pagamentos
        </button>
      </div>

      {abaAtiva === 'dados' && (
        <div className="card section-stack">
          <p>
            <strong>Nome:</strong> {user?.nome}
          </p>
          <p>
            <strong>E-mail:</strong> {user?.email}
          </p>
          <p>
            <strong>Tipo:</strong> {user?.tipo}
          </p>
        </div>
      )}

      {abaAtiva === 'compras' && (
        <div className="card section-stack">
          <h3>Resumo financeiro</h3>
          <p className="metric-value">R$ {totalInvestido.toLocaleString('pt-BR')}</p>
          <p className="page-subtitle">Total investido em {contratos.length} contrato(s).</p>
        </div>
      )}

      {abaAtiva === 'contratos' && (
        <div className="section-stack">
          {contratos.length === 0 && <div className="empty-state">Nenhum contrato encontrado.</div>}
          {contratos.map((contrato) => (
            <div key={contrato.id} className="card">
              <h3>Contrato #{contrato.id}</h3>
              <p>
                <strong>Terreno:</strong> {contrato.terreno.titulo}
              </p>
              <p>
                <strong>Status:</strong> {contrato.status}
              </p>
              <p>
                <strong>Valor total:</strong> R$ {Number(contrato.valorTotal).toLocaleString('pt-BR')}
              </p>
            </div>
          ))}
        </div>
      )}

      {abaAtiva === 'parcelas' && (
        <div className="card">
          {parcelas.length === 0 ? (
            <div className="empty-state">Nenhuma parcela cadastrada.</div>
          ) : (
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Contrato</th>
                  <th>Terreno</th>
                  <th>Status</th>
                  <th>Valor</th>
                  <th>Vencimento</th>
                </tr>
              </thead>
              <tbody>
                {parcelas.map((pagamento) => (
                  <tr key={pagamento.id}>
                    <td>#{pagamento.contratoId}</td>
                    <td>{pagamento.terrenoTitulo}</td>
                    <td>{pagamento.status}</td>
                    <td>R$ {Number(pagamento.valor).toLocaleString('pt-BR')}</td>
                    <td>{new Date(pagamento.dataVencimento).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
}
