import ProductsLoop from "../components/ProductsLoop"
import Footer from "../components/Footer"
import Header from "../components/Header"
import "./Home.css"

const Home = () => {
  return (
    <>    
      <Header />
      <div className="hero-section">
        <h1>Ponele Música a tu Vida</h1>
        <h2>Comprá tus Vinilos Favoritos en Purple Cat</h2>
        <button className="hero-btn">Ver Catálogo</button>
      </div>
      <div className="section">
        <h2>Destacados del Mes</h2>
        <ProductsLoop />
      </div>
      <div className="section">
        <h2>Productos en Descuento</h2>
        <ProductsLoop />
      </div>
      <Footer />
    </>
  )
}

export default Home