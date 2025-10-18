// backend/src/controllers/usuario.controller.js
import Usuario from "../models/usuario.model.js";

// GET - Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Error obtenerUsuarios:", error);
    res.status(500).json({ error: error.message });
  }
};

// POST - Crear nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    // Validaciones
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Validar longitud mínima de contraseña
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 8 caracteres" });
    }

    // Validar que tenga al menos una letra y un número
    const tieneLetra = /[a-zA-Z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);

    if (!tieneLetra || !tieneNumero) {
      return res.status(400).json({
        error: "La contraseña debe contener al menos una letra y un número",
      });
    }

    // Verificar si el correo ya existe
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const usuario = await Usuario.create({ nombre, correo, password });
    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error crearUsuario:", error);
    res.status(400).json({ error: error.message });
  }
};

// PUT - Actualizar usuario por ID
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    console.error("Error actualizarUsuario:", error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Eliminar usuario por ID
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await usuario.destroy();
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminarUsuario:", error);
    res.status(500).json({ error: error.message });
  }
};
