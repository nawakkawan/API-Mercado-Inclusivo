import request from 'supertest';
import app from '../../app.js'; // caminho relativo correto
import sequelize from '../config/database.js'; // mesma estrutura do teste de usuário

let vagaId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Testes de CRUD para Vagas', () => {
  test('Cria uma nova vaga', async () => {
    const res = await request(app).post('/vagas').send({
      titulo: 'Analista de Dados Jr',
      descricao: 'Vaga para PCD com experiência em SQL',
      localizacao: 'Belo Horizonte',
      empresa: 'Inclusiva LTDA',
      tipo: 'Presencial'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    vagaId = res.body.id;
  }, 20000);

  test('Lista todas as vagas', async () => {
    const res = await request(app).get('/vagas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  }, 20000);

  test('Busca uma vaga por ID', async () => {
    const res = await request(app).get(`/vagas/${vagaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Analista de Dados Jr');
  }, 20000);

  test('Atualiza uma vaga', async () => {
    const res = await request(app).put(`/vagas/${vagaId}`).send({
      titulo: 'Analista de Dados Pleno'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Analista de Dados Pleno');
  }, 20000);

  test('Deleta uma vaga', async () => {
    const res = await request(app).delete(`/vagas/${vagaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  }, 20000);
});