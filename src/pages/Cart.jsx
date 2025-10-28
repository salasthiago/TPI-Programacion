import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart();

  if (cart.length === 0) {
    return <h2 className="cart-empty">Tu carrito está vacío</h2>;
  }

  const parsePrice = (price) =>
    Number(price.toString().replace(/[^0-9.-]+/g, ""));
  const total = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Mi Carrito</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>
              {item.name} - $
              {(parsePrice(item.price) * item.quantity).toFixed(2)}
              {item.quantity > 1 && (
                <span className="item-quantity"> (x{item.quantity})</span>
              )}
            </span>

            <div className="cart-buttons">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <button onClick={() => addToCart(item)}>+</button>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: ${total.toFixed(2)}</p>
      <button className="clear-cart-btn" onClick={clearCart}>
        Vaciar Carrito
      </button>
    </div>
  );
};

export default Cart;
