import Carrito from '../models/carrito.model.js';
import Producto from '../models/producto.model.js';

// GET - Obtener carrito del usuario autenticado
export const obtenerCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    
    const items = await Carrito.findAll({
      where: { usuarioId },
      include: [{
        model: Producto,
        attributes: ['id', 'name', 'artist', 'price', 'image', 'stock']
      }]
    });

    res.json(items);
  } catch (error) {
    console.error('Error obtenerCarrito:', error);
    res.status(500).json({ error: error.message });
  }
};

// POST - Agregar producto al carrito
export const agregarAlCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { productoId, cantidad = 1 } = req.body;

    if (!productoId) {
      return res.status(400).json({ error: 'El productoId es requerido' });
    }

    // Verificar que el producto existe
    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar stock disponible
    if (producto.stock < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    // Buscar si ya existe en el carrito
    const itemExistente = await Carrito.findOne({
      where: { usuarioId, productoId }
    });

    if (itemExistente) {
      // Actualizar cantidad
      const nuevaCantidad = itemExistente.cantidad + cantidad;
      
      if (producto.stock < nuevaCantidad) {
        return res.status(400).json({ error: 'Stock insuficiente' });
      }

      await itemExistente.update({ cantidad: nuevaCantidad });
      
      const itemActualizado = await Carrito.findByPk(itemExistente.id, {
        include: [{ model: Producto }]
      });
      
      return res.json(itemActualizado);
    } else {
      // Crear nuevo item
      const nuevoItem = await Carrito.create({
        usuarioId,
        productoId,
        cantidad
      });

      const itemCompleto = await Carrito.findByPk(nuevoItem.id, {
        include: [{ model: Producto }]
      });

      return res.status(201).json(itemCompleto);
    }
  } catch (error) {
    console.error('Error agregarAlCarrito:', error);
    res.status(400).json({ error: error.message });
  }
};

// PUT - Actualizar cantidad de un item del carrito
export const actualizarCantidad = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { id } = req.params;
    const { cantidad } = req.body;

    if (!cantidad || cantidad < 1) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
    }

    const item = await Carrito.findOne({
      where: { id, usuarioId },
      include: [{ model: Producto }]
    });

    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado en el carrito' });
    }

    // Verificar stock
    if (item.Producto.stock < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    await item.update({ cantidad });
    
    const itemActualizado = await Carrito.findByPk(id, {
      include: [{ model: Producto }]
    });

    res.json(itemActualizado);
  } catch (error) {
    console.error('Error actualizarCantidad:', error);
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Eliminar un item del carrito
export const eliminarDelCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const { id } = req.params;

    const item = await Carrito.findOne({
      where: { id, usuarioId }
    });

    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado en el carrito' });
    }

    await item.destroy();
    res.json({ message: 'Item eliminado del carrito' });
  } catch (error) {
    console.error('Error eliminarDelCarrito:', error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Vaciar todo el carrito del usuario
export const vaciarCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    await Carrito.destroy({
      where: { usuarioId }
    });

    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    console.error('Error vaciarCarrito:', error);
    res.status(500).json({ error: error.message });
  }
};

