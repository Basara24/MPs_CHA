import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { LocationSelectFields } from '../components/LocationSelectFields';
import type { UserType } from '../types';
import { formatCpf, formatPhone, onlyDigits } from '../utils/validators';
import { userRegisterSchema } from '../validation/schemas';
import type { UserRegisterInput } from '../validation/schemas';

type AdminCreateType = Extract<UserType, 'ADMIN' | 'VENDEDOR'>;

export function RegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.tipo === 'ADMIN';

  const [tipoAdmin, setTipoAdmin] = useState<AdminCreateType>('VENDEDOR');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserRegisterInput>({
    resolver: zodResolver(userRegisterSchema),
    mode: 'onChange',
    defaultValues: {
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      estado: '',
      cidade: '',
      senha: '',
      confirmarSenha: '',
    },
  });
  const estadoSelecionado = watch('estado');
  const cidadeSelecionada = watch('cidade');
  const cpfAtual = watch('cpf');
  const telefoneAtual = watch('telefone');

  const submitLabel = useMemo(
    () => (isAdmin ? 'Cadastrar usuário' : 'Criar conta'),
    [isAdmin],
  );

  async function onSubmit(values: UserRegisterInput) {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        nome: values.nome,
        cpf: onlyDigits(values.cpf),
        telefone: onlyDigits(values.telefone),
        email: values.email,
        estado: values.estado,
        cidade: values.cidade,
        senha: values.senha,
      };

      if (isAdmin) {
        await api.post('/users', { ...payload, tipo: tipoAdmin });
        setSuccess(
          tipoAdmin === 'ADMIN'
            ? 'Administrador cadastrado com sucesso.'
            : 'Corretor cadastrado com sucesso.',
        );
        reset();
        setTipoAdmin('VENDEDOR');
      } else {
        await api.post('/auth/register', payload);
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
      <form onSubmit={handleSubmit(onSubmit)} className="card auth-card narrow form-grid">
        <span className="auth-logo">TerraGest Prime</span>
        <h1 className="page-title">
          {isAdmin ? 'Cadastro de administradores e corretores' : 'Criar sua conta'}
        </h1>
        <p className="auth-note">
          {isAdmin
            ? 'Adicione membros da equipe para ampliar a operacao comercial.'
            : 'Comece a acompanhar oportunidades de investimento em terrenos com total transparencia.'}
        </p>
        <input type="text" placeholder="Nome completo" {...register('nome')} />
        {errors.nome && <p className="error">{errors.nome.message}</p>}

        <div className="toolbar">
          <div className="form-grid">
            <input
              type="text"
              placeholder="CPF"
              value={cpfAtual}
              onChange={(event) => setValue('cpf', formatCpf(event.target.value), { shouldValidate: true })}
              inputMode="numeric"
            />
            {errors.cpf && <p className="error">{errors.cpf.message}</p>}
          </div>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Telefone"
              value={telefoneAtual}
              onChange={(event) =>
                setValue('telefone', formatPhone(event.target.value), { shouldValidate: true })
              }
              inputMode="tel"
            />
            {errors.telefone && <p className="error">{errors.telefone.message}</p>}
          </div>
        </div>
        <input type="hidden" {...register('cpf')} />
        <input type="hidden" {...register('telefone')} />

        <input type="email" placeholder="E-mail" {...register('email')} />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <LocationSelectFields
          estado={estadoSelecionado}
          cidade={cidadeSelecionada}
          onEstadoChange={(value) => setValue('estado', value, { shouldValidate: true })}
          onCidadeChange={(value) => setValue('cidade', value, { shouldValidate: true })}
          estadoError={errors.estado?.message}
          cidadeError={errors.cidade?.message}
        />
        <input type="hidden" {...register('estado')} />
        <input type="hidden" {...register('cidade')} />

        <input type="password" placeholder="Senha" {...register('senha')} />
        {errors.senha && <p className="error">{errors.senha.message}</p>}
        <input type="password" placeholder="Confirmação de senha" {...register('confirmarSenha')} />
        {errors.confirmarSenha && <p className="error">{errors.confirmarSenha.message}</p>}

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
