import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, resolveAssetUrl } from '../api/client';
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

  if (!terreno) {
    return (
      <section className="page-section">
        <div className="card loading-state">Carregando terreno...</div>
      </section>
    );
  }

  const saldo = Number(terreno.valor) - entrada;
  const parcela = parcelas > 0 ? saldo / parcelas : saldo;
  const statusClass =
    terreno.status === 'VENDIDO'
      ? 'status-chip danger'
      : terreno.status === 'RESERVADO'
        ? 'status-chip warning'
        : 'status-chip';

  return (
    <section className="page-section">
      <article className="card">
        <div className="page-header">
          <div>
            <h2 className="page-title">{terreno.titulo}</h2>
            <p className="page-subtitle">{terreno.descricao}</p>
          </div>
          <span className={statusClass}>{terreno.status}</span>
        </div>
        <div className="card-meta">
          <span className="chip">
            {terreno.cidade}/{terreno.estado}
          </span>
          <span className="chip">{Number(terreno.tamanho)} m²</span>
        </div>
        <p className="metric-value">R$ {Number(terreno.valor).toLocaleString('pt-BR')}</p>
      </article>

      <article className="card">
        <h3>Galeria de imagens</h3>
        <div className="grid">
          {terreno.imagens.length > 0 ? (
            terreno.imagens.map((imagem) => (
              <img
                key={imagem.id}
                className="card-image"
                src={resolveAssetUrl(imagem.url)}
                alt={`${terreno.titulo} - imagem ${imagem.id}`}
              />
            ))
          ) : (
            <div className="card-image" />
          )}
        </div>
      </article>

      <article className="card section-stack">
        <h3>Simulacao de investimento</h3>
        <div className="toolbar">
          <input
            type="number"
            placeholder="Valor de entrada"
            value={entrada || ''}
            onChange={(e) => setEntrada(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Quantidade de parcelas"
            value={parcelas || ''}
            onChange={(e) => setParcelas(Number(e.target.value))}
          />
        </div>
        <p>
          Estimativa por parcela: <strong>R$ {Math.max(parcela, 0).toFixed(2)}</strong>
        </p>
      </article>

      <article className="card section-stack">
        <h3>Localizacao</h3>
        <p className="page-subtitle">Visualize o ponto aproximado do terreno no mapa.</p>
        <iframe
          title="Mapa do terreno"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(`${terreno.cidade}, ${terreno.estado}`)}&output=embed`}
          loading="lazy"
        />
      </article>

      {user?.tipo === 'CLIENTE' && (
        <div>
          <button type="button" onClick={() => void demonstrarInteresse()}>
            Tenho interesse
          </button>
        </div>
      )}
    </section>
  );
}
