import Usuario from '../models/usuario.model.js';

// GET - Obtener todos los usuarios (SuperAdmin)
export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['password'] } // No devolver passwords
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error obtenerUsuarios:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST - Crear nuevo usuario (registro público)
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, role } = req.body;

    // Validaciones
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // Verificar si el correo ya existe
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // No permitir que usuarios normales se registren como Admin o SuperAdmin
    const rolePermitido = role && req.usuario?.role === 'SuperAdmin' ? role : 'User';

    const usuario = await Usuario.create({ 
      nombre, 
      correo, 
      password,
      role: rolePermitido
    });

    // No devolver la contraseña
    const { password: _, ...usuarioSinPassword } = usuario.toJSON();
    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    console.error('Error crearUsuario:', error);
    res.status(400).json({ error: error.message });
  }
};

// POST - Login
export const loginUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: 'Correo y contraseña requeridos' });
    }

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // No devolver la contraseña
    const { password: _, ...usuarioSinPassword } = usuario.toJSON();
    res.json({ 
      mensaje: 'Login exitoso',
      usuario: usuarioSinPassword
    });
  } catch (error) {
    console.error('Error loginUsuario:', error);
    res.status(500).json({ error: error.message });
  }
};

// PUT - Actualizar usuario (SuperAdmin puede editar cualquiera, usuario solo a sí mismo)
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Solo SuperAdmin puede cambiar roles
    if (req.body.role && req.usuario.role !== 'SuperAdmin') {
      return res.status(403).json({ error: 'No tienes permiso para cambiar roles' });
    }

    await usuario.update(req.body);
    
    const { password: _, ...usuarioSinPassword } = usuario.toJSON();
    res.json(usuarioSinPassword);
  } catch (error) {
    console.error('Error actualizarUsuario:', error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Eliminar usuario (solo SuperAdmin)
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // No permitir que el SuperAdmin se elimine a sí mismo
    if (usuario.id === req.usuario.id) {
      return res.status(400).json({ error: 'No puedes eliminar tu propia cuenta' });
    }

    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminarUsuario:', error);
    res.status(500).json({ error: error.message });
  }
};