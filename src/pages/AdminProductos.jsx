import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import "./AdminProductos.css";

const AdminProductos = () => {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    price: "",
    year: "",
    description: "",
    stock: "",
    genre: "",
    label: "",
    format: "LP",
    condition: "Nuevo"
  });

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/productos");
      if (res.ok) {
        const data = await res.json();
        setProductos(data);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      artist: "",
      price: "",
      year: "",
      description: "",
      stock: "",
      genre: "",
      label: "",
      format: "LP",
      condition: "Nuevo"
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `http://localhost:3000/api/productos/${editingId}`
        : "http://localhost:3000/api/productos";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "user-id": user.id
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert(editingId ? "Producto actualizado" : "Producto creado");
        resetForm();
        obtenerProductos();
      } else {
        const error = await res.json();
        alert(error.error || "Error al guardar producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  const handleEdit = (producto) => {
    setFormData({
      name: producto.name,
      artist: producto.artist,
      price: producto.price,
      year: producto.year || "",
      description: producto.description || "",
      stock: producto.stock,
      genre: producto.genre || "",
      label: producto.label || "",
      format: producto.format || "LP",
      condition: producto.condition || "Nuevo"
    });
    setEditingId(producto.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: "DELETE",
        headers: {
          "user-id": user.id
        }
      });

      if (res.ok) {
        alert("Producto eliminado");
        obtenerProductos();
      } else {
        alert("Error al eliminar producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="admin-container">
          <p>Cargando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="admin-container">
        <div className="admin-header">
          <h1>Gestión de Productos</h1>
          <button
            className="hero-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancelar" : "➕ Agregar Producto"}
          </button>
        </div>

        {showForm && (
          <div className="admin-form-container">
            <h2>{editingId ? "Editar Producto" : "Nuevo Producto"}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre del álbum *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="artist"
                  placeholder="Artista *"
                  value={formData.artist}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <input
                  type="number"
                  name="price"
                  placeholder="Precio *"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="year"
                  placeholder="Año"
                  value={formData.year}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="genre"
                  placeholder="Género"
                  value={formData.genre}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <input
                  type="text"
                  name="label"
                  placeholder="Discográfica"
                  value={formData.label}
                  onChange={handleInputChange}
                />
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleInputChange}
                >
                  <option value="LP">LP</option>
                  <option value="2LP">2LP</option>
                  <option value="EP">EP</option>
                  <option value="Single">Single</option>
                </select>
              </div>

              <div className="form-row">
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Usado - Excelente">Usado - Excelente</option>
                  <option value="Usado - Bueno">Usado - Bueno</option>
                  <option value="Usado - Aceptable">Usado - Aceptable</option>
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              />

              <div className="form-buttons">
                <button type="submit" className="product-btn">
                  {editingId ? "Actualizar" : "Crear"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={resetForm}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Artista</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Año</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.name}</td>
                  <td>{producto.artist}</td>
                  <td>${producto.price}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.year}</td>
                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(producto)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(producto.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminProductos;

