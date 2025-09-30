const ProductsLoop = () => {
  const products = [
    { id: 1, name: "Abbey Road", artist: "The Beatles", price: "$25.99" },
    { id: 2, name: "Dark Side of the Moon", artist: "Pink Floyd", price: "$28.99" },
    { id: 3, name: "Thriller", artist: "Michael Jackson", price: "$24.99" },
    { id: 4, name: "Back in Black", artist: "AC/DC", price: "$22.99" }
  ]

  return (
    <div className="products-container">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="vinyl-icon">💿</div>
          <h3>{product.name}</h3>
          <p>{product.artist}</p>
          <div className="product-price">{product.price}</div>
          <button className="product-btn">Agregar al Carrito</button>
        </div>
      ))}
    </div>
  )
}

export default ProductsLoop