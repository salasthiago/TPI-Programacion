import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import "./AdminProductos.css"; // Reutilizamos los mismos estilos

const AdminUsuarios = () => {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        headers: {
          "user-id": user.id
        }
      });

      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      } else {
        alert("Error al obtener usuarios");
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const cambiarRole = async (id, nuevoRole) => {
    if (!confirm(`¿Cambiar rol a ${nuevoRole}?`)) return;

    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "user-id": user.id
        },
        body: JSON.stringify({ role: nuevoRole })
      });

      if (res.ok) {
        alert("Rol actualizado");
        obtenerUsuarios();
      } else {
        const error = await res.json();
        alert(error.error || "Error al actualizar rol");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  const eliminarUsuario = async (id) => {
    if (id === user.id) {
      alert("No puedes eliminarte a ti mismo");
      return;
    }

    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "user-id": user.id
        }
      });

      if (res.ok) {
        alert("Usuario eliminado");
        obtenerUsuarios();
      } else {
        alert("Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "SuperAdmin":
        return "badge-superadmin";
      case "Admin":
        return "badge-admin";
      default:
        return "badge-user";
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
          <h1>Gestión de Usuarios</h1>
          <div className="stats">
            <span className="stat-badge">Total: {usuarios.length}</span>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>
                    <span className={`role-badge ${getRoleBadgeClass(usuario.role)}`}>
                      {usuario.role}
                    </span>
                  </td>
                  <td>{new Date(usuario.createdAt).toLocaleDateString()}</td>
                  <td className="actions">
                    {usuario.id !== user.id && (
                      <>
                        <select
                          className="role-select"
                          value={usuario.role}
                          onChange={(e) => cambiarRole(usuario.id, e.target.value)}
                        >
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                          <option value="SuperAdmin">SuperAdmin</option>
                        </select>
                        <button
                          className="delete-btn"
                          onClick={() => eliminarUsuario(usuario.id)}
                        >
                          🗑️
                        </button>
                      </>
                    )}
                    {usuario.id === user.id && (
                      <span style={{ color: "#666", fontSize: "0.9rem" }}>
                        (Tú)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-info">
          <h3>ℹ️ Información sobre roles</h3>
          <ul>
            <li><strong>User:</strong> Puede navegar y comprar productos</li>
            <li><strong>Admin:</strong> Puede gestionar productos (crear, editar, eliminar)</li>
            <li><strong>SuperAdmin:</strong> Puede gestionar productos y usuarios</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminUsuarios;

