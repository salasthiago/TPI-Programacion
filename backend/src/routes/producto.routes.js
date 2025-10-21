import express from 'express';
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  subirImagenProducto       // 👈 importamos la nueva función
} from '../controllers/producto.controller.js';
import { verificarAuth, verificarAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js'; // 👈 importamos multer

const router = express.Router();

// Rutas públicas
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);

// Rutas protegidas (requieren Admin o SuperAdmin)
router.post('/', verificarAuth, verificarAdmin, crearProducto);
router.put('/:id', verificarAuth, verificarAdmin, actualizarProducto);
router.delete('/:id', verificarAuth, verificarAdmin, eliminarProducto);

// 📸 Subida de imagen (solo Admin o SuperAdmin)
router.post(
  '/:id/imagen',
  verificarAuth,
  verificarAdmin,
  upload.single('imagen'),
  subirImagenProducto
);

export default router;
