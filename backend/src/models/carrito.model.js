import { DataTypes } from 'sequelize';
import sequelize from './database.js';
import Usuario from './usuario.model.js';
import Producto from './producto.model.js';

const Carrito = sequelize.define('Carrito', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
}, {
  tableName: 'carritos',
  timestamps: true
});

// Definir relaciones
Usuario.hasMany(Carrito, { foreignKey: 'usuarioId', onDelete: 'CASCADE' });
Carrito.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Producto.hasMany(Carrito, { foreignKey: 'productoId', onDelete: 'CASCADE' });
Carrito.belongsTo(Producto, { foreignKey: 'productoId' });

export default Carrito;

