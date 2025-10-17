import { useEffect, useState } from "react";
import axios from "axios";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  // Obtener usuarios al cargar la página
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    const res = await axios.get("http://localhost:3000/api/usuarios");
    setUsuarios(res.data);
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/usuarios", { nombre, email });
    setNombre("");
    setEmail("");
    obtenerUsuarios();
  };

  const eliminarUsuario = async (id) => {
    await axios.delete(`http://localhost:3000/api/usuarios/${id}`);
    obtenerUsuarios();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestión de Usuarios</h1>

      <form onSubmit={crearUsuario} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nombre} ({u.email}){" "}
            <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
