import React, { useState } from "react";
import "./Auth.css";

function Auth({ onLogin }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [modo, setModo] = useState("login");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = modo === "login" ? "login" : "usuarios";
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

      const data = await res.json();
      if (res.ok) {
        onLogin && onLogin(data); // setea usuario logueado si viene la prop
      } else {
        alert(data.error || "Ocurrió un error");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div className={`container ${modo === "registro" ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Crear una Cuenta</h1>

          {/* Siempre renderizamos los campos, solo los mostramos/ocultamos con CSS */}
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
            />
          </div>

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

          <div
            className={`fields registro-fields ${modo === "registro" ? "show" : "hide"}`}
            aria-hidden={modo !== "registro"}
          >
            <input
              className="input-field"
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">{modo === "login" ? "Ingresar" : "Registrarse"}</button>
        </form>
      </div>

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

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>¡Hola otra vez!</h1>
            <p>Ingresá tus datos para acceder a la página.</p>
            <button
              type="button"
              className="hidden"
              onClick={() => setModo("login")}
            >
              Iniciar Sesión
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Bienvenido!</h1>
            <p>¡Registrate para usar la mejor tienda online de vinilos!</p>
            <button
              type="button"
              className="hidden"
              onClick={() => setModo("registro")}
            >
              Crear Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
