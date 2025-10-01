export default function Product({id,name,artist,price}) {
  return (
    <>
      <div className="product-card">
        <div className="vinyl-icon">💿</div>
        <h3>{name}</h3>
        <p>{artist}</p>
        <div className="product-price">{price}</div>
        <button className="product-btn">Agregar al Carrito</button>
      </div>
    </>
  );
}
