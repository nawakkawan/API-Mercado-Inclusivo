import sequelize from './src/config/database.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Não foi possível conectar ao banco de dados:', err);
    process.exit(1); // Encerra o processo em caso de erro
  }
})();
