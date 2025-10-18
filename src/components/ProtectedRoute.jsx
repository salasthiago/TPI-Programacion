import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Si no hay usuario logueado, redirige al login
    return <Navigate to="/" replace />;
  }

  // Si hay usuario logueado, renderiza el componente
  return children;
}
