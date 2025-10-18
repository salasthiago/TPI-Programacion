import Product from "./Product"

const ProductsLoop = () => {
  const products = [
    { id: 1, name: "Abbey Road", artist: "The Beatles", price: "25.99" },
    { id: 2, name: "Dark Side of the Moon", artist: "Pink Floyd", price: "28.99" },
    { id: 3, name: "Thriller", artist: "Michael Jackson", price: "24.99" },
    { id: 4, name: "Back in Black", artist: "AC/DC", price: "22.99" }
  ]

  return (
    <div className="products-container">
      {products.map(product => (
        <Product key={product.id} id={product.id} name={product.name} artist={product.artist} price={product.price}></Product>
      ))}
    </div>
  )
}

export default ProductsLoop