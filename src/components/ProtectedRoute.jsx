import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    // Si no hay usuario logueado, redirige al login
    return <Navigate to="/" replace />;
  }

  // Si se requiere un rol específico, verificar
  if (requiredRole) {
    if (requiredRole === "SuperAdmin" && user.role !== "SuperAdmin") {
      return <Navigate to="/home" replace />;
    }
    if (requiredRole === "Admin" && user.role !== "Admin" && user.role !== "SuperAdmin") {
      return <Navigate to="/home" replace />;
    }
  }

  // Si hay usuario logueado y tiene el rol correcto, renderiza el componente
  return children;
}
