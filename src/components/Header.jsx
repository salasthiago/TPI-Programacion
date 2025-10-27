import purplecat from "../assets/purplecat.jpeg"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="header-section">
      <div className="header-content">
        <Link to="/home">
          <img src={purplecat} alt="Logo de la Marca Purple Cat" className="logo-simple" />
        </Link>
        <nav>
          <ul className="nav-menu">
            <li><Link to="/home">Inicio</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/cart">🛒 {totalItems}</Link></li>
            {/* Mostrar enlace de productos solo para Admin y SuperAdmin */}
            {(user?.role === "Admin" || user?.role === "SuperAdmin") && (
              <li><Link to="/admin/productos">📦 Productos</Link></li>
            )}
            {/* Mostrar enlace de usuarios solo para SuperAdmin */}
            {user?.role === "SuperAdmin" && (
              <li><Link to="/admin/usuarios">👥 Usuarios</Link></li>
            )}
            {/* Botón de logout */}
            {user && (
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  🚪 Salir
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
