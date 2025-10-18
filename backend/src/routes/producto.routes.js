import express from 'express';
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../controllers/producto.controller.js';
import { verificarAuth, verificarAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Rutas protegidas (requieren Admin o SuperAdmin)
router.post('/', verificarAuth, verificarAdmin, crearProducto);
router.put('/:id', verificarAuth, verificarAdmin, actualizarProducto);
router.delete('/:id', verificarAuth, verificarAdmin, eliminarProducto);

export default router;