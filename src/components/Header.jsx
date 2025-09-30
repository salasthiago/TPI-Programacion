import purplecat from "../assets/purplecat.jpeg"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="header-section">
      <div className="header-content">
        <Link to="/">
          <img src={purplecat} alt="Logo de la Marca Purple Cat" className="logo-simple" />
        </Link>
        <nav>
          <ul className="nav-menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Header
