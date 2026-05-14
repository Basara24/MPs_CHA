import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api, resolveAssetUrl } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { ImageUploadField } from '../components/ImageUploadField';
import { LocationSelectFields } from '../components/LocationSelectFields';
import type { Terreno } from '../types';
import { terrenoFormSchema } from '../validation/schemas';
import type { TerrenoFormInput } from '../validation/schemas';

export function TerrenosPage() {
  const { user } = useAuth();
  const canManage = user?.tipo === 'ADMIN' || user?.tipo === 'VENDEDOR';
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TerrenoFormInput>({
    resolver: zodResolver(terrenoFormSchema),
    mode: 'onChange',
    defaultValues: {
      titulo: '',
      descricao: '',
      tamanho: 0,
      valor: 0,
      cidade: '',
      estado: '',
    },
  });
  const selectedEstado = watch('estado');
  const selectedCidade = watch('cidade');

  async function load() {
    const res = await api.get<Terreno[]>('/terrenos');
    setTerrenos(res.data);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onSubmit(values: TerrenoFormInput) {
    setSubmitting(true);
    setFormError('');

    try {
      const payload = new FormData();
      payload.append('titulo', values.titulo);
      payload.append('descricao', values.descricao);
      payload.append('tamanho', String(values.tamanho));
      payload.append('valor', String(values.valor));
      payload.append('estado', values.estado);
      payload.append('cidade', values.cidade);
      images.forEach((file) => payload.append('images', file));

      await api.post('/terrenos', payload);
      reset();
      setImages([]);
      await load();
    } catch {
      setFormError('Nao foi possivel cadastrar o terreno no momento.');
    } finally {
      setSubmitting(false);
    }
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
        <form className="card form-grid" onSubmit={handleSubmit(onSubmit)}>
          <h3>Novo terreno</h3>
          <input placeholder="Titulo" {...register('titulo')} />
          {errors.titulo && <p className="error">{errors.titulo.message}</p>}
          <textarea placeholder="Descricao" {...register('descricao')} />
          {errors.descricao && <p className="error">{errors.descricao.message}</p>}
          <div className="toolbar">
            <div className="form-grid">
              <input
                type="number"
                placeholder="Tamanho m²"
                min={1}
                step="0.01"
                {...register('tamanho', { valueAsNumber: true })}
              />
              {errors.tamanho && <p className="error">{errors.tamanho.message}</p>}
            </div>
            <div className="form-grid">
              <input
                type="number"
                placeholder="Valor"
                min={1}
                step="0.01"
                {...register('valor', { valueAsNumber: true })}
              />
              {errors.valor && <p className="error">{errors.valor.message}</p>}
            </div>
          </div>
          <LocationSelectFields
            estado={selectedEstado}
            cidade={selectedCidade}
            onEstadoChange={(value) => setValue('estado', value, { shouldValidate: true })}
            onCidadeChange={(value) => setValue('cidade', value, { shouldValidate: true })}
            estadoError={errors.estado?.message}
            cidadeError={errors.cidade?.message}
          />
          <input type="hidden" {...register('estado')} />
          <input type="hidden" {...register('cidade')} />
          <ImageUploadField files={images} onChange={setImages} loading={submitting} />
          {formError && <p className="error">{formError}</p>}
          <button type="submit" disabled={submitting}>
            {submitting ? 'Salvando terreno...' : 'Cadastrar terreno'}
          </button>
        </form>
      )}

      <div className="grid">
        {terrenos.map((terreno) => (
          <article key={terreno.id} className="card card-hover">
            {terreno.imagens[0]?.url ? (
              <img
                className="card-image"
                src={resolveAssetUrl(terreno.imagens[0].url)}
                alt={terreno.titulo}
              />
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
