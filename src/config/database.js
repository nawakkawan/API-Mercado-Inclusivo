import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: isTest ? ':memory:' : (process.env.DB_STORAGE || './database.sqlite'),
  logging: false, // opcional: desativa logs para teste
});

export default sequelize;
