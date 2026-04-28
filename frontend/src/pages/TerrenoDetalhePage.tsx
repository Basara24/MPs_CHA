import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import type { Terreno } from '../types';

export function TerrenoDetalhePage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const [terreno, setTerreno] = useState<Terreno | null>(null);
  const [entrada, setEntrada] = useState(0);
  const [parcelas, setParcelas] = useState(12);

  useEffect(() => {
    if (!params.id) return;
    api.get<Terreno>(`/terrenos/${params.id}`).then((res) => setTerreno(res.data));
  }, [params.id]);

  async function demonstrarInteresse() {
    if (!params.id) return;
    await api.post(`/interessados/terreno/${params.id}`, {
      mensagem: 'Tenho interesse neste terreno.',
    });
    alert('Interesse registrado com sucesso.');
  }

  if (!terreno) return <p>Carregando terreno...</p>;

  const saldo = Number(terreno.valor) - entrada;
  const parcela = parcelas > 0 ? saldo / parcelas : saldo;

  return (
    <section className="card">
      <h2>{terreno.titulo}</h2>
      <p>{terreno.descricao}</p>
      <p>
        {terreno.cidade}/{terreno.estado} - {Number(terreno.tamanho)} m²
      </p>
      <p>Valor: R$ {Number(terreno.valor).toLocaleString('pt-BR')}</p>

      <h3>Simulação de financiamento</h3>
      <div className="toolbar">
        <input
          type="number"
          placeholder="Entrada"
          value={entrada || ''}
          onChange={(e) => setEntrada(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Parcelas"
          value={parcelas || ''}
          onChange={(e) => setParcelas(Number(e.target.value))}
        />
      </div>
      <p>Estimativa da parcela: R$ {Math.max(parcela, 0).toFixed(2)}</p>

      <h3>Localização</h3>
      <iframe
        title="Mapa do terreno"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(`${terreno.cidade}, ${terreno.estado}`)}&output=embed`}
        loading="lazy"
      />

      {user?.tipo === 'CLIENTE' && (
        <button type="button" onClick={() => void demonstrarInteresse()}>
          Tenho interesse
        </button>
      )}
    </section>
  );
}
