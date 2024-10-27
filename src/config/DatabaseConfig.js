require("dotenv").config(); // Para carregar as variáveis do .env

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    ssl: process.env.DB_SSL === "true",
  }
);

module.exports = sequelize;
