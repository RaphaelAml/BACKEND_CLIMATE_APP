const { Sequelize } = require("sequelize");
require("dotenv").config();

// Cria uma nova instância do Sequelize usando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false, // Desabilita logs de SQL no console (opcional)
    retry: {
      match: [/SequelizeConnectionError/, /SequelizeConnectionRefusedError/],
      max: 5, // Tentará se reconectar 5 vezes
    },
  }
);

// Testa a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados foi bem-sucedida!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

// Exporta a instância do Sequelize
module.exports = sequelize;
