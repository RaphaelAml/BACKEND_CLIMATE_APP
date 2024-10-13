const express = require("express");
const sequelize = require("./src/config/database");
const weatherRoutes = require('./src/routes/weatherRoutes');
const cityRoutes = require("./src/routes/cityRoutes");
require('./src/models/associations');  // Importando as associações

const app = express();
app.use(express.json());

// Inicializa Sequelize e sincroniza os modelos
sequelize
  .sync({ alter: true }) 
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

// Usar as rotas de clima e cidades
app.use("/api", weatherRoutes);
app.use("/api", cityRoutes); 
app.use('/api', weatherRoutes); // Usando as rotas no caminho base "/api"

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
