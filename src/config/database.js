require('dotenv').config(); // Para carregar as variáveis do .env

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,         // Nome do banco de dados
  process.env.DB_USER,         // Usuário do banco de dados
  process.env.DB_PASSWORD,     // Senha do banco de dados
  {
    host: process.env.DB_HOST, // Host do banco de dados
    port: process.env.DB_PORT, // Porta do banco de dados
    dialect: process.env.DB_DIALECT, // Dialeto do banco de dados (Postgres)
    ssl: process.env.DB_SSL === 'true', // SSL ativado se for 'true'
  }
);

module.exports = sequelize;
