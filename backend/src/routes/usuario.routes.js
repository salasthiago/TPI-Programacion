import express from 'express';
import {
  obtenerUsuarios,
  crearUsuario,
  loginUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuario.controller.js';
import { verificarAuth, verificarSuperAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.post('/', crearUsuario); // Registro
router.post('/login', loginUsuario); // Login

// Rutas protegidas (solo SuperAdmin)
router.get('/', verificarAuth, verificarSuperAdmin, obtenerUsuarios);
router.put('/:id', verificarAuth, verificarSuperAdmin, actualizarUsuario);
router.delete('/:id', verificarAuth, verificarSuperAdmin, eliminarUsuario);

export default router;