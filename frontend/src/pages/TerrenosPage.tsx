import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import type { Terreno } from '../types';

export function TerrenosPage() {
  const { user } = useAuth();
  const canManage = user?.tipo === 'ADMIN' || user?.tipo === 'VENDEDOR';
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    tamanho: 0,
    valor: 0,
    cidade: '',
    estado: '',
  });

  async function load() {
    const res = await api.get<Terreno[]>('/terrenos');
    setTerrenos(res.data);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await api.post('/terrenos', form);
    setForm({ titulo: '', descricao: '', tamanho: 0, valor: 0, cidade: '', estado: '' });
    await load();
  }

  async function remove(id: number) {
    await api.delete(`/terrenos/${id}`);
    await load();
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <div>
          <h2 className="page-title">{canManage ? 'Gestao de terrenos' : 'Catalogo de terrenos'}</h2>
          <p className="page-subtitle">
            Explore propriedades selecionadas com visualizacao completa de valor e localizacao.
          </p>
        </div>
      </div>

      {canManage && (
        <form className="card form-grid" onSubmit={onSubmit}>
          <h3>Novo terreno</h3>
          <input
            placeholder="Título"
            value={form.titulo}
            onChange={(e) => setForm((old) => ({ ...old, titulo: e.target.value }))}
            required
          />
          <textarea
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm((old) => ({ ...old, descricao: e.target.value }))}
            required
          />
          <div className="toolbar">
            <input
              type="number"
              placeholder="Tamanho m²"
              value={form.tamanho || ''}
              onChange={(e) => setForm((old) => ({ ...old, tamanho: Number(e.target.value) }))}
              required
            />
            <input
              type="number"
              placeholder="Valor"
              value={form.valor || ''}
              onChange={(e) => setForm((old) => ({ ...old, valor: Number(e.target.value) }))}
              required
            />
          </div>
          <div className="toolbar">
            <input
              placeholder="Cidade"
              value={form.cidade}
              onChange={(e) => setForm((old) => ({ ...old, cidade: e.target.value }))}
              required
            />
            <input
              placeholder="Estado"
              value={form.estado}
              onChange={(e) => setForm((old) => ({ ...old, estado: e.target.value }))}
              required
            />
          </div>
          <button type="submit">Cadastrar terreno</button>
        </form>
      )}

      <div className="grid">
        {terrenos.map((terreno) => (
          <article key={terreno.id} className="card card-hover">
            {terreno.imagens[0]?.url ? (
              <img className="card-image" src={terreno.imagens[0].url} alt={terreno.titulo} />
            ) : (
              <div className="card-image" />
            )}
            <h3>{terreno.titulo}</h3>
            <p>{terreno.descricao}</p>
            <div className="card-meta">
              <span className="chip">
                {terreno.cidade}/{terreno.estado}
              </span>
              <span className="chip">{Number(terreno.tamanho)} m²</span>
              <span className="chip status-chip">{terreno.status}</span>
            </div>
            <p className="metric-value">R$ {Number(terreno.valor).toLocaleString('pt-BR')}</p>
            <Link to={`/terrenos/${terreno.id}`} className="button-secondary">
              Detalhes
            </Link>
            {canManage && (
              <button type="button" onClick={() => void remove(terreno.id)}>
                Excluir
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
