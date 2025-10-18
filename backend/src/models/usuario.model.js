import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 100],
        msg: 'La contraseña debe tener entre 8 y 100 caracteres'
      }
    }
  },
  role: {
    type: DataTypes.ENUM('SuperAdmin', 'Admin', 'User'),
    allowNull: false,
    defaultValue: 'User'
  }
}, {
  tableName: 'usuarios',
  timestamps: true
});

export default Usuario;
  