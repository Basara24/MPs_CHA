import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import type { Terreno } from '../types';

export function HomePage() {
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [busca, setBusca] = useState('');
  const [cidade, setCidade] = useState('');
  const [precoMax, setPrecoMax] = useState('');
  const [tamanhoMin, setTamanhoMin] = useState('');

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

  const terrenosFiltrados = terrenos.filter((terreno) => {
    const matchBusca =
      busca.trim().length === 0 ||
      terreno.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      terreno.cidade.toLowerCase().includes(busca.toLowerCase());
    const matchTamanho = tamanhoMin ? Number(terreno.tamanho) >= Number(tamanhoMin) : true;
    return matchBusca && matchTamanho;
  });

  return (
    <section className="page-section">
      <div className="card">
        <div className="page-header">
          <div>
            <h2 className="page-title">Terrenos disponiveis para investimento</h2>
            <p className="page-subtitle">
              Descubra oportunidades premium em localizacoes rurais de alto potencial.
            </p>
          </div>
          <Link to="/terrenos" className="button-secondary">
            Ver catalogo completo
          </Link>
        </div>
      </div>

      <div className="card form-grid">
        <h3>Buscar e filtrar</h3>
        <div className="toolbar">
          <input
            placeholder="Pesquisar por titulo ou cidade"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <input
            placeholder="Filtrar por cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preco maximo"
            value={precoMax}
            onChange={(e) => setPrecoMax(e.target.value)}
          />
          <input
            type="number"
            placeholder="Tamanho minimo (m²)"
            value={tamanhoMin}
            onChange={(e) => setTamanhoMin(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={() => void loadTerrenos()}>
            Aplicar filtros
          </button>
        </div>
      </div>

      <div className="grid">
        {terrenosFiltrados.map((terreno) => (
          <article key={terreno.id} className="card card-hover">
            {terreno.imagens[0]?.url ? (
              <img className="card-image" src={terreno.imagens[0].url} alt={terreno.titulo} />
            ) : (
              <div className="card-image" />
            )}
            <h3>{terreno.titulo}</h3>
            <div className="card-meta">
              <span className="chip">
                {terreno.cidade}/{terreno.estado}
              </span>
              <span className="chip">{Number(terreno.tamanho)} m²</span>
              <span className="chip status-chip">{terreno.status}</span>
            </div>
            <p className="metric-value">R$ {Number(terreno.valor).toLocaleString('pt-BR')}</p>
            <Link to={`/terrenos/${terreno.id}`} className="button-primary">
              Ver detalhes
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
