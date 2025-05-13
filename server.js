import sequelize from './src/config/database.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log(' Conexão com o banco de dados estabelecida com sucesso.');
    return sequelize.sync(); // Cria as tabelas baseadas nos models
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' Não foi possível conectar ao banco de dados:', err);
  });
