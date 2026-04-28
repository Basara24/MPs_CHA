import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { UserType } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: UserType[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <div className="center-screen">Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.tipo)) return <Navigate to="/" replace />;

  return <>{children}</>;
}
