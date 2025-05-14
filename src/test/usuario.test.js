import request from 'supertest';
import app from '../../app.js';
import { sequelize } from '../models/index.js';

let usuarioId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes de CRUD para Usuário', () => {
  test('Cria um novo usuário', async () => {
    const res = await request(app).post('/usuarios').send({
      nome: 'João PCD',
      email: 'joao@pcd.com',
      senha: '123456',
      tipo: 'PCD',
      deficiencia: 'Visual'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    usuarioId = res.body.id;
  }, 20000); // timeout individual

  // Repita o timeout individual se necessário nos outros testes:
  test('Lista todos os usuários', async () => {
    const res = await request(app).get('/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  }, 20000);

  test('Busca um usuário por ID', async () => {
    const res = await request(app).get(`/usuarios/${usuarioId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('João PCD');
  }, 20000);

  test('Atualiza um usuário', async () => {
    const res = await request(app).put(`/usuarios/${usuarioId}`).send({
      nome: 'João Atualizado'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('João Atualizado');
  }, 20000);

  test('Deleta um usuário', async () => {
    const res = await request(app).delete(`/usuarios/${usuarioId}`);
    expect(res.statusCode).toBe(204);
  }, 20000);
});
