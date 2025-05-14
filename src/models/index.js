import sequelize from '../config/database.js';
import Sequelize from 'sequelize';
import UsuarioModel from './usuario.model.js';

const Usuario = UsuarioModel(sequelize, Sequelize.DataTypes);

export { Usuario, sequelize };
