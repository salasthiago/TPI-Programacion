const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-content">
        <div>
          <h3>Purple Cat</h3>
          <p>Tu tienda de vinilos de confianza desde 2024</p>
          <p>Música que nunca pasa de moda</p>
        </div>
        <div>
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="#">Catálogo</a></li>
            <li><a href="#">Ofertas</a></li>
          </ul>
        </div>
        <div>
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="#">📘</a>
            <a href="#">📷</a>
            <a href="#">🐦</a>
            <a href="#">🎵</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Purple Cat - Todos los derechos reservados</p>
      </div>
    </div>
  )
}

export default Footer