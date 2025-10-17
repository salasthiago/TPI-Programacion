// backend/src/controllers/usuario.controller.js
import Usuario from '../models/usuario.model.js';

// GET - Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error obtenerUsuarios:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST - Crear nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error crearUsuario:', error);
    res.status(400).json({ error: error.message });
  }
};

// PUT - Actualizar usuario por ID
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    console.error('Error actualizarUsuario:', error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Eliminar usuario por ID
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminarUsuario:', error);
    res.status(500).json({ error: error.message });
  }
};
