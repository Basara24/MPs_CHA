import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import type { UserType } from '../types';

type AdminCreateType = Extract<UserType, 'ADMIN' | 'VENDEDOR'>;

export function RegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.tipo === 'ADMIN';

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoAdmin, setTipoAdmin] = useState<AdminCreateType>('VENDEDOR');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const submitLabel = useMemo(
    () => (isAdmin ? 'Cadastrar usuário' : 'Criar conta'),
    [isAdmin],
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isAdmin) {
        await api.post('/users', { nome, email, senha, tipo: tipoAdmin });
        setSuccess(
          tipoAdmin === 'ADMIN'
            ? 'Administrador cadastrado com sucesso.'
            : 'Corretor cadastrado com sucesso.',
        );
        setNome('');
        setEmail('');
        setSenha('');
        setTipoAdmin('VENDEDOR');
      } else {
        await api.post('/auth/register', { nome, email, senha });
        navigate('/login', { replace: true });
      }
    } catch (err) {
      if (err instanceof AxiosError && typeof err.response?.data?.message === 'string') {
        setError(err.response.data.message);
      } else {
        setError('Não foi possível concluir o cadastro');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="center-screen auth-screen">
      <form onSubmit={onSubmit} className="card auth-card narrow form-grid">
        <span className="auth-logo">TerraGest Prime</span>
        <h1 className="page-title">
          {isAdmin ? 'Cadastro de administradores e corretores' : 'Criar sua conta'}
        </h1>
        <p className="auth-note">
          {isAdmin
            ? 'Adicione membros da equipe para ampliar a operacao comercial.'
            : 'Comece a acompanhar oportunidades de investimento em terrenos com total transparencia.'}
        </p>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha (mín. 6 caracteres)"
          minLength={6}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {isAdmin && (
          <select
            value={tipoAdmin}
            onChange={(e) => setTipoAdmin(e.target.value as AdminCreateType)}
            required
          >
            <option value="VENDEDOR">Corretor</option>
            <option value="ADMIN">Administrador</option>
          </select>
        )}

        {error && <p className="error">{error}</p>}
        {success && <p className="status-chip">{success}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : submitLabel}
        </button>

        {!isAdmin && (
          <p className="auth-note">
            Ja tem conta? <Link to="/login">Entrar</Link>
          </p>
        )}
      </form>
    </div>
  );
}
