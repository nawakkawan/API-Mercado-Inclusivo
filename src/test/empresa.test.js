import request from 'supertest';
import  app  from '../../app.js';
import Empresa from '../models/empresa.model.js';

// Mock completo do modelo Empresa
jest.mock('../../models/empresa.model.js');

describe('Rotas de Empresa (com mocks)', () => {
  beforeEach(() => {
    // Resetar todos os mocks antes de cada teste
    Empresa.mockClear();
  });

  test('POST /api/empresas - criar empresa com sucesso', async () => {
    const mockEmpresa = {
      id: 1,
      nome: 'Empresa Teste',
      cnpj: '12345678901234',
      email: 'teste@empresa.com'
    };

    // Mock da função create
    Empresa.create.mockResolvedValue(mockEmpresa);

    const response = await request(app)
      .post('/api/empresas')
      .send(mockEmpresa);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockEmpresa);
    expect(Empresa.create).toHaveBeenCalledWith(mockEmpresa);
  });

  test('GET /api/empresas - listar empresas', async () => {
    const mockEmpresas = [
      { id: 1, nome: 'Empresa 1' },
      { id: 2, nome: 'Empresa 2' }
    ];

    // Mock da função findAll
    Empresa.findAll.mockResolvedValue(mockEmpresas);

    const response = await request(app)
      .get('/api/empresas');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEmpresas);
  });

  test('GET /api/empresas/:id - buscar empresa existente', async () => {
    const mockEmpresa = { id: 1, nome: 'Empresa Teste' };
    
    // Mock da função findByPk
    Empresa.findByPk.mockResolvedValue(mockEmpresa);

    const response = await request(app)
      .get('/api/empresas/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockEmpresa);
    expect(Empresa.findByPk).toHaveBeenCalledWith('1');
  });

  test('GET /api/empresas/:id - empresa não encontrada', async () => {
    // Mock da função findByPk retornando null
    Empresa.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .get('/api/empresas/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ erro: 'Empresa não encontrada' });
  });
});