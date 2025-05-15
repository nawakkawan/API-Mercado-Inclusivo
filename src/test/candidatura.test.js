import request from 'supertest';
import app from '../../app.js';
import { sequelize } from '../models/index.js';

let candidaturaId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes CRUD para Candidatura', () => {
  test('Cria uma nova candidatura', async () => {

    const usuarioRes = await request(app).post('/usuarios').send({
      nome: 'Teste Usuário',
      email: 'teste@usuario.com',
      senha: '123456',
      tipo: 'PCD',
      deficiencia: 'Auditiva'
    });

    expect(usuarioRes.statusCode).toBe(201);

    const res = await request(app).post('/candidaturas').send({
      usuarioId: usuarioRes.body.id,
      vagaId: 1,
      status: 'pendente'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    candidaturaId = res.body.id;
  }, 20000);

  test('Lista todas as candidaturas', async () => {
    const res = await request(app).get('/candidaturas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  }, 20000);

  test('Busca candidatura por ID', async () => {
    const res = await request(app).get(`/candidaturas/${candidaturaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(candidaturaId);
  }, 20000);

  test('Atualiza candidatura', async () => {
    const res = await request(app).put(`/candidaturas/${candidaturaId}`).send({
      status: 'aprovado'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('aprovado');
  }, 20000);

  test('Deleta candidatura', async () => {
    const res = await request(app).delete(`/candidaturas/${candidaturaId}`);
    expect(res.statusCode).toBe(204);
  }, 20000);
});
