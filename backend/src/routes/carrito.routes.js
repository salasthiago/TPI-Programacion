import express from 'express';
import {
  obtenerCarrito,
  agregarAlCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
  vaciarCarrito
} from '../controllers/carrito.controller.js';
import { verificarAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verificarAuth);

router.get('/', obtenerCarrito);
router.post('/', agregarAlCarrito);
router.put('/:id', actualizarCantidad);
router.delete('/:id', eliminarDelCarrito);
router.delete('/', vaciarCarrito);

export default router;

