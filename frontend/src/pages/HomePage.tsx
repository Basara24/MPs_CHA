import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import type { Terreno } from '../types';

export function HomePage() {
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [cidade, setCidade] = useState('');
  const [precoMax, setPrecoMax] = useState('');

  async function loadTerrenos() {
    const res = await api.get<Terreno[]>('/terrenos', {
      params: {
        cidade: cidade || undefined,
        precoMax: precoMax || undefined,
      },
    });
    setTerrenos(res.data);
  }

  useEffect(() => {
    void loadTerrenos();
  }, []);

  return (
    <section>
      <h2>Terrenos disponíveis</h2>
      <div className="toolbar">
        <input
          placeholder="Filtrar por cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço máximo"
          value={precoMax}
          onChange={(e) => setPrecoMax(e.target.value)}
        />
        <button type="button" onClick={() => void loadTerrenos()}>
          Filtrar
        </button>
      </div>

      <div className="grid">
        {terrenos.map((terreno) => (
          <article key={terreno.id} className="card">
            <h3>{terreno.titulo}</h3>
            <p>
              {terreno.cidade}/{terreno.estado}
            </p>
            <p>R$ {Number(terreno.valor).toLocaleString('pt-BR')}</p>
            <p>{Number(terreno.tamanho)} m²</p>
            <Link to={`/terrenos/${terreno.id}`}>Ver detalhes</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
