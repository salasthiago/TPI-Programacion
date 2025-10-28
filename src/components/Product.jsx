import { useCart } from "../context/CartContext";
import { useNotification } from "./Notification";

export default function Product({ id, name, artist, price, year }) {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  const handleAdd = async () => {
    const success = await addToCart({ id, name, artist, price });

    if (success) {
      showNotification({
        title: "¡Agregado al carrito!",
        message: `${name} - ${artist}`,
        type: "success",
        duration: 3000
      });
    }
  };

  return (
    <>
      <div className="product-card">
        <div className="vinyl-icon">💿</div>
        <h3>{name}</h3>
        <p>{artist}</p>
        <p>{year}</p>
        <div className="product-price">${price}</div>
        <button className="product-btn" onClick={handleAdd}>Agregar al Carrito</button>
      </div>
    </>
  );
}
