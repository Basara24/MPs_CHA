import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../api/client';

interface Contrato {
  id: number;
  status: string;
  valorTotal: number;
  cliente: { nome: string };
  terreno: { titulo: string };
}

export function ContratosPage() {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [form, setForm] = useState({
    clienteId: 0,
    terrenoId: 0,
    valorTotal: 0,
    dataInicio: new Date().toISOString().slice(0, 10),
    quantidadeParcelas: 12,
    primeiroVencimento: new Date().toISOString().slice(0, 10),
  });

  async function load() {
    const res = await api.get<Contrato[]>('/contratos');
    setContratos(res.data);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    await api.post('/contratos', form);
    await load();
  }

  return (
    <section>
      <h2>Gestão de contratos</h2>
      <form className="card" onSubmit={onSubmit}>
        <h3>Novo contrato</h3>
        <div className="toolbar">
          <input
            type="number"
            placeholder="ID cliente"
            value={form.clienteId || ''}
            onChange={(e) => setForm((old) => ({ ...old, clienteId: Number(e.target.value) }))}
            required
          />
          <input
            type="number"
            placeholder="ID terreno"
            value={form.terrenoId || ''}
            onChange={(e) => setForm((old) => ({ ...old, terrenoId: Number(e.target.value) }))}
            required
          />
          <input
            type="number"
            placeholder="Valor total"
            value={form.valorTotal || ''}
            onChange={(e) => setForm((old) => ({ ...old, valorTotal: Number(e.target.value) }))}
            required
          />
        </div>
        <div className="toolbar">
          <input
            type="date"
            value={form.dataInicio}
            onChange={(e) => setForm((old) => ({ ...old, dataInicio: e.target.value }))}
            required
          />
          <input
            type="number"
            placeholder="Parcelas"
            value={form.quantidadeParcelas || ''}
            onChange={(e) =>
              setForm((old) => ({ ...old, quantidadeParcelas: Number(e.target.value) }))
            }
            required
          />
          <input
            type="date"
            value={form.primeiroVencimento}
            onChange={(e) => setForm((old) => ({ ...old, primeiroVencimento: e.target.value }))}
            required
          />
        </div>
        <button type="submit">Criar contrato</button>
      </form>

      <div className="grid">
        {contratos.map((contrato) => (
          <article className="card" key={contrato.id}>
            <h3>Contrato #{contrato.id}</h3>
            <p>Cliente: {contrato.cliente.nome}</p>
            <p>Terreno: {contrato.terreno.titulo}</p>
            <p>Status: {contrato.status}</p>
            <p>Valor total: R$ {Number(contrato.valorTotal).toLocaleString('pt-BR')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
