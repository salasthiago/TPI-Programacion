import ProductsLoop from "../components/ProductsLoop"
import Footer from "../components/Footer"
import Header from "../components/Header"
import "./Home.css"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>    
      <Header />
      <div className="hero-section">
        <h1>Ponele Música a tu Vida</h1>
        <h2>Comprá tus Vinilos Favoritos en Purple Cat</h2>
        <Link to="/catalogo"><button className="hero-btn">Ver Catálogo</button></Link>
      </div>
      <div className="section">
        <h2>Destacados del Mes</h2>
        <ProductsLoop limit={3} offset={0} />
      </div>
      <div className="section">
        <h2>Productos en Descuento</h2>
        <ProductsLoop limit={3} offset={3} />
      </div>
      <Footer />
    </>
  )
}

export default Home