// server.js
const express = require("express");
const sequelize = require("./src/config/database");
const weatherRoutes = require('./src/routes/weatherRoutes');
const City = require("./src/models/City");
const User = require("./src/models/User");
const CityForecast = require("./src/models/CityForecast");
const WeatherHistory = require("./src/models/WeatherHistory");
const WeatherForecast = require("./src/models/WeatherForecast");
const cityRoutes = require("./src/routes/cityRoutes");
require('./src/models/associations');  // Importando as associações

const app = express();
app.use(express.json());

// Inicializa Sequelize e sincroniza os modelos
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced successfully!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Rotas
app.get("/", (req, res) => {
  res.status(200).send("API server ON");
});

// Usar as rotas de clima
app.use("/api", weatherRoutes);
app.use("/api", cityRoutes); // Adicione esta linha para usar as rotas de cidade

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
