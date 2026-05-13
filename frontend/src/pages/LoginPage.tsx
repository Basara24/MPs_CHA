import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    try {
      await login(email, senha);
      navigate('/');
    } catch {
      setError('Credenciais inválidas');
    }
  }

  return (
    <div className="center-screen auth-screen">
      <form onSubmit={onSubmit} className="card auth-card narrow form-grid">
        <span className="auth-logo">TerraGest Prime</span>
        <h1 className="page-title">Acesse sua area de investimentos</h1>
        <p className="auth-note">
          Controle de terrenos e chacaras com seguranca, visao de mercado e operacao premium.
        </p>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar na plataforma</button>
        <p className="auth-note">
          Ainda nao tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </form>
    </div>
  );
}
