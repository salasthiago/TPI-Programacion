import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1900,
      max: new Date().getFullYear()
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  discography: {
    type: DataTypes.STRING,
    allowNull: true
  },
  format: {
    type: DataTypes.ENUM('LP', 'EP', 'Single', '12"', '10"', '7"'),
    allowNull: false,
    defaultValue: 'LP'
  },
  condition: {
    type: DataTypes.ENUM('Nuevo', 'Usado - Impecable', 'Usado - Excelente', 'Usado - Bueno'),
    allowNull: false,
    defaultValue: 'New'
  }
}, {
  tableName: 'productos',
  timestamps: true
});

export default Producto;