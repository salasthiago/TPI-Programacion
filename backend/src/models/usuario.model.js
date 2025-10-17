import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default Usuario;
  