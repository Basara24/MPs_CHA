import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function ShellLayout() {
  const { user, logout } = useAuth();
  const isManager = user?.tipo === 'ADMIN' || user?.tipo === 'VENDEDOR';

  return (
    <div className="app-shell">
      <header className="shell-header">
        <div className="shell-header-top">
          <div className="brand-block">
            <Link to="/" className="brand">
              TerraGest Prime
            </Link>
            <small className="auth-note">Inteligencia imobiliaria para investimentos rurais</small>
          </div>
          <div className="section-stack">
            <span className="role-badge">{user?.tipo}</span>
            <button type="button" onClick={logout}>
              Sair
            </button>
          </div>
        </div>
        <nav className="shell-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/terrenos">Terrenos</NavLink>
          <NavLink to="/perfil">Perfil</NavLink>
          {isManager && (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/clientes">Clientes</NavLink>
              <NavLink to="/contratos">Contratos</NavLink>
              <NavLink to="/relatorios">Relatorios</NavLink>
            </>
          )}
          {user?.tipo === 'ADMIN' && <NavLink to="/register">Cadastrar equipe</NavLink>}
        </nav>
      </header>

      <main className="page-section">
        <div className="page-header">
          <>
            <h1 className="page-title">Plataforma de terrenos e chacaras premium</h1>
            <p className="page-subtitle">
              Navegacao segura para clientes, corretores e administradores.
            </p>
          </>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
