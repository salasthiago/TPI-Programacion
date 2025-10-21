// backend/src/controllers/producto.controller.js
import path from 'path';
import Producto from '../models/producto.model.js';

// GET - Obtener todos los productos (público)
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error('Error obtenerProductos:', error);
    res.status(500).json({ error: error.message });
  }
};

// GET - Obtener un producto por ID (público)
export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error obtenerProductoPorId:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST - Crear producto (Admin/SuperAdmin)
export const crearProducto = async (req, res) => {
  try {
    const { name, artist, price, image, year, description, stock, genre, label, format, condition } = req.body;

    if (!name || !artist || !price) {
      return res.status(400).json({ error: 'Nombre, Artista y precio son obligatorios' });
    }

    const producto = await Producto.create({
      name,
      artist,
      price,
      image,
      year,
      description,
      stock: stock || 0,
      genre,
      label,
      format: format || 'LP',
      condition: condition || 'Nuevo'
    });

    res.status(201).json(producto);
  } catch (error) {
    console.error('Error crearProducto:', error);
    res.status(400).json({ error: error.message });
  }
};

// PUT - Actualizar producto (Admin/SuperAdmin)
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.update(req.body);
    res.json(producto);
  } catch (error) {
    console.error('Error actualizarProducto:', error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Eliminar producto (Admin/SuperAdmin)
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminarProducto:', error);
    res.status(500).json({ error: error.message });
  }
};

/* ============================
   POST - Subir imagen (solo imagen)
   Body: form-data → key: "imagen" (File)
   Ruta guarda la imagen en /public/uploads/vinilos
   y setea productos.image = "uploads/vinilos/archivo.ext"
============================ */
export const subirImagenProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'Falta el archivo "imagen"' });
    }

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Ruta relativa POSIX para guardar en DB (compatible Win/Linux)
    const relPath = path.posix.join('uploads/vinilos', req.file.filename);

    await producto.update({
      image: relPath,                 // se guarda sin "/public"
      updatedAt: new Date()           // por si tu modelo lo usa
    });

    return res.json({
      ok: true,
      producto_id: Number(id),
      image_path_db: relPath,         // lo que quedó en la DB
      url_publica: `/${relPath}`      // usar directo en <img src="/uploads/..">
    });
  } catch (error) {
    console.error('Error subirImagenProducto:', error);
    res.status(500).json({ error: 'No se pudo guardar la imagen' });
  }
};
