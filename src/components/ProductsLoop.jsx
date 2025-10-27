import { useState, useEffect } from "react"
import Product from "./Product"

const ProductsLoop = ({ limit = 3, offset = 0 }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/productos", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        if (res.ok) {
          const data = await res.json()
          // Aplicar offset y limit para mostrar productos específicos
          setProducts(data.slice(offset, offset + limit))
        } else {
          console.error("Error al obtener productos")
        }
      } catch (error) {
        console.error("Error en la petición:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [limit, offset])

  if (loading) {
    return <div className="products-container">Cargando productos...</div>
  }

  return (
    <div className="products-container">
      {products.map(product => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          artist={product.artist}
          price={product.price}
          year={product.year}
        />
      ))}
    </div>
  )
}

export default ProductsLoop