const express = require("express");
const sequelize = require("./src/config/DatabaseConfig");
const { Op } = require("sequelize");
const cityRoutes = require("./src/routes/CityRoutes");
const wheatherRoutes = require("./src/routes/WheatherRoutes");
const cors = require("cors");
require("./src/models/Associations");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// permite requisições do frontend
app.use(cors());

//log de requisições
app.use((req, res, next) => {
  console.log(`Recebido request: ${req.method} ${req.originalUrl}`);
  next();
});

// Usar rotas
app.use("/api", cityRoutes, wheatherRoutes);

// Erro de rota n encontrada
app.use((req, res) => {
  res.status(404).send("Route not found");
});

//Declaração de Models

// Inicializa Sequelize e sincroniza os modelos
sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Database synced successfully!");
    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
