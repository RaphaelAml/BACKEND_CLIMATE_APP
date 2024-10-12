const { Sequelize } = require('sequelize'); 

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize('climateapp', 'postgres', '2636', {
  host: 'localhost',
  dialect: 'postgres', // Substitua pelo seu banco de dados
});

// Exportando a instância do Sequelize
module.exports = sequelize;
