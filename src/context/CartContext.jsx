import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const API_URL = "http://localhost:3000/api/carrito";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // Función para convertir price a número, por si viene con "$"
  const parsePrice = (price) => Number(price.toString().replace(/[^0-9.-]+/g, ""));

  // Headers con autenticación
  const getHeaders = () => ({
    "Content-Type": "application/json",
    "user-id": user?.id || ""
  });

  // Cargar carrito desde el backend cuando el usuario inicia sesión
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  // Obtener carrito del backend
  const fetchCart = async () => {
    if (!user) return;

    try {
      const res = await fetch(API_URL, {
        headers: getHeaders()
      });

      if (res.ok) {
        const items = await res.json();
        // Transformar datos del backend al formato del frontend
        const cartItems = items.map(item => ({
          id: item.Producto.id,
          name: item.Producto.name,
          artist: item.Producto.artist,
          price: item.Producto.price,
          image: item.Producto.image,
          quantity: item.cantidad,
          cartItemId: item.id // ID del item en la tabla carrito
        }));
        setCart(cartItems);
      }
    } catch (error) {
      console.error("Error al cargar carrito:", error);
    }
  };

  // Agregar producto (si existe, aumenta cantidad)
  const addToCart = async (product) => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ productoId: product.id, cantidad: 1 })
      });

      if (res.ok) {
        await fetchCart(); // Recargar carrito
        return true; // Éxito
      } else {
        const data = await res.json();
        alert(data.error || "Error al agregar al carrito");
        return false;
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Error de conexión");
      return false;
    }
  };

  // Disminuir cantidad de un producto
  const decreaseQuantity = async (productId) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    if (item.quantity === 1) {
      // Si la cantidad es 1, eliminar el producto
      await removeFromCart(productId);
    } else {
      // Actualizar cantidad
      try {
        const res = await fetch(`${API_URL}/${item.cartItemId}`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({ cantidad: item.quantity - 1 })
        });

        if (res.ok) {
          await fetchCart();
        }
      } catch (error) {
        console.error("Error al actualizar cantidad:", error);
      }
    }
  };

  // Eliminar producto por completo
  const removeFromCart = async (productId) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    try {
      const res = await fetch(`${API_URL}/${item.cartItemId}`, {
        method: "DELETE",
        headers: getHeaders()
      });

      if (res.ok) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };

  // Vaciar carrito
  const clearCart = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: getHeaders()
      });

      if (res.ok) {
        setCart([]);
      }
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
    }
  };

  // Totales
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
