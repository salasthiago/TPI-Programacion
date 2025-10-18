import Usuario from '../models/usuario.model.js';

// Verificar que el usuario esté autenticado
export const verificarAuth = async (req, res, next) => {
  try {
    const userId = req.headers['user-id'];
    
    if (!userId) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const usuario = await Usuario.findByPk(userId);
    
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    req.usuario = usuario; // Guardamos el usuario en la request
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error de autenticación' });
  }
};

// Verificar que el usuario sea Admin o SuperAdmin
export const verificarAdmin = (req, res, next) => {
  if (req.usuario.role !== 'Admin' && req.usuario.role !== 'SuperAdmin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de Admin.' });
  }
  next();
};

// Verificar que el usuario sea SuperAdmin
export const verificarSuperAdmin = (req, res, next) => {
  if (req.usuario.role !== 'SuperAdmin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de SuperAdmin.' });
  }
  next();
};