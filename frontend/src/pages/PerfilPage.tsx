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

  useEffect(() => {
    api.get<ContratoItem[]>('/contratos').then((res) => {
      const filtrados = res.data.filter((item) => item.clienteId === user?.sub);
      setContratos(filtrados);
    });
  }, [user?.sub]);

  return (
    <section>
      <h2>Perfil do cliente</h2>
      <div className="card">
        <p>Nome: {user?.nome}</p>
        <p>E-mail: {user?.email}</p>
        <p>Tipo: {user?.tipo}</p>
      </div>

      <h3>Contratos ativos e parcelas</h3>
      {contratos.map((contrato) => (
        <div key={contrato.id} className="card">
          <p>
            Contrato #{contrato.id} - {contrato.terreno.titulo} - {contrato.status}
          </p>
          {contrato.pagamentos.map((pagamento) => (
            <p key={pagamento.id}>
              Parcela #{pagamento.id} - {pagamento.status} - R$ {Number(pagamento.valor).toFixed(2)} -
              vencimento {new Date(pagamento.dataVencimento).toLocaleDateString('pt-BR')}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}
