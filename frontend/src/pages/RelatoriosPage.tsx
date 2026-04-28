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
    <section>
      <h2>Relatórios e financeiro</h2>
      <div className="card">
        <a href={`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/reports/vendas.csv`}>
          Baixar relatório de vendas (CSV)
        </a>
        <a
          href={`${import.meta.env.VITE_API_URL ?? 'http://localhost:3000'}/reports/inadimplencia.csv`}
        >
          Baixar relatório de inadimplência (CSV)
        </a>
      </div>

      <div className="card">
        <h3>Parcelas em atraso: {resumo?.total ?? 0}</h3>
        {resumo?.itens.map((item) => (
          <p key={item.id}>
            {item.contrato.cliente.nome} - {item.contrato.terreno.titulo} - R$ {Number(item.valor)} -
            vencimento {new Date(item.dataVencimento).toLocaleDateString('pt-BR')}
          </p>
        ))}
      </div>
    </section>
  );
}
