import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ShellLayout } from './components/ShellLayout';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ClientesPage } from './pages/ClientesPage';
import { ContratosPage } from './pages/ContratosPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { PerfilPage } from './pages/PerfilPage';
import { RegisterPage } from './pages/RegisterPage';
import { RelatoriosPage } from './pages/RelatoriosPage';
import { TerrenoDetalhePage } from './pages/TerrenoDetalhePage';
import { TerrenosPage } from './pages/TerrenosPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ShellLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="terrenos" element={<TerrenosPage />} />
          <Route path="terrenos/:id" element={<TerrenoDetalhePage />} />
          <Route path="perfil" element={<PerfilPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute roles={['ADMIN', 'VENDEDOR']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="clientes"
            element={
              <ProtectedRoute roles={['ADMIN', 'VENDEDOR']}>
                <ClientesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="contratos"
            element={
              <ProtectedRoute roles={['ADMIN', 'VENDEDOR']}>
                <ContratosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="relatorios"
            element={
              <ProtectedRoute roles={['ADMIN', 'VENDEDOR']}>
                <RelatoriosPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
