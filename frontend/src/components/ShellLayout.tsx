import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export function ShellLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header>
        <div>
          <Link to="/" className="brand">
            TerraGest
          </Link>
          <small>{user?.tipo}</small>
        </div>
        <button type="button" onClick={logout}>
          Sair
        </button>
      </header>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/terrenos">Terrenos</NavLink>
        <NavLink to="/perfil">Perfil</NavLink>
        {(user?.tipo === 'ADMIN' || user?.tipo === 'VENDEDOR') && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/clientes">Clientes</NavLink>
            <NavLink to="/contratos">Contratos</NavLink>
            <NavLink to="/relatorios">Relatórios</NavLink>
          </>
        )}
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
