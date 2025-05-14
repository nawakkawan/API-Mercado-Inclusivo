import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/index.js';
import corsMiddleware from './src/middleware/cors.js';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Middleware para habilitar CORS
app.use(corsMiddleware);

// Middleware para parse de JSON no corpo da requisição
app.use(express.json());

app.use(router);

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('API Vagas Inclusivas - Funciona!');
});

// Defina suas rotas principais aqui
// Exemplo de rota para listar vagas (precisa de implementação no controller)
app.get('/vagas', (req, res) => {
  res.status(200).json({ message: 'Aqui estarão as vagas exclusivas para PCDs' });
});

// Mais rotas podem ser adicionadas conforme necessário, como:
// app.use('/vagas', vagasRoutes); // Para agrupar as rotas de vagas, por exemplo.

// Exporte o app para ser usado em server.js
export default app;
