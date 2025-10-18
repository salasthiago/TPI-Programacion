import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "../context/AuthContext";

function Auth() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [modo, setModo] = useState("login");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Endpoint y body según modo
    const endpoint = modo === "login" ? "usuarios/login" : "usuarios";
    const metodo = "POST";
    const body =
      modo === "login"
        ? { correo, password }
        : { nombre, correo, password, confirmPassword };

    try {
      const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Respuesta del servidor no es JSON:\n" + text);
      }

      if (res.ok) {
        const usuario = data.usuario || data;

        // Guardar en contexto
        login(usuario);

        // Guardar en localStorage
        localStorage.setItem("usuario", JSON.stringify(usuario));

        // Redirigir
        navigate("/home");
      } else {
        alert(data.error || "Ocurrió un error en el servidor");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className={`container ${modo === "registro" ? "active" : ""}`} id="container">
      {/* Formulario Registro */}
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Crear una Cuenta</h1>
          <div
            className={`fields registro-fields ${modo === "registro" ? "show" : "hide"}`}
            aria-hidden={modo !== "registro"}
          >
            <input
              className="input-field"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required={modo === "registro"}
            />
            <input
              className="input-field"
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={modo === "registro"}
            />
          </div>
          <button type="submit">{modo === "login" ? "Ingresar" : "Registrarse"}</button>
        </form>
      </div>

      {/* Formulario Login */}
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>
          <div
            className={`fields login-fields ${modo === "login" ? "show" : "hide"}`}
            aria-hidden={modo !== "login"}
          >
            <input
              className="input-field"
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>

      {/* Panel de toggle */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>¡Hola otra vez!</h1>
            <p>Ingresá tus datos para acceder a la página.</p>
            <button type="button" className="hidden" onClick={() => setModo("login")}>
              Iniciar Sesión
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>¡Bienvenido!</h1>
            <p>¡Registrate para usar la mejor tienda online de vinilos!</p>
            <button type="button" className="hidden" onClick={() => setModo("registro")}>
              Crear Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
