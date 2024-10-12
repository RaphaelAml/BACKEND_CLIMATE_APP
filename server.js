const express = require('express');
const sequelize = require('./src/config/database'); // Certifique-se que o caminho está correto

// Importar os modelos que serão sincronizados
require('./src/models/City');
require('./src/models/CityForecast');
require('./src/models/Country')
require('./src/models/State');
require('./src/models/User');
require('./src/models/WeatherHistory');
require('./src/models/WeatherForecast');

const app = express();
const PORT = 3000;

// Teste de conexão com o banco de dados e sincronização
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados foi bem-sucedida!');
    // Sincronizar os modelos com o banco de dados
    return sequelize.sync({ alter: true }); // `alter: true` atualiza a tabela sem destruir os dados
  })
  .then(() => {
    console.log('Tabelas criadas ou atualizadas com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
