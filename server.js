const express = require("express");
const sequelize = require("./src/config/database");
const cityRoutes = require("./src/routes/cityRoutes"); // Importando rotas da cidade
const cors = require("cors");
require("./src/models/associations");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// permite requisições do frontend
app.use(cors());

//log de requisições
app.use((req, res, next) => {
  console.log(`Recebido request: ${req.method} ${req.originalUrl}`);
  next();
});

// Usar rotas
app.use("/api", cityRoutes);

// Erro de rota n encontrada
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Inicializa Sequelize e sincroniza os modelos
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
