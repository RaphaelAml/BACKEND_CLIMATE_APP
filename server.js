const express = require("express");
const sequelize = require("./src/config/database");
const City = require("./src/models/City");
const User = require("./src/models/User");
const CityForecast = require("./src/models/CityForecast");
const WeatherHistory = require("./src/models/WeatherHistory");
const WeatherForecast = require("./src/models/WeatherForecast");
const weatherRoutes = require('./src/routes/weatherRoutes'); // Adicione esta linha

// Associate models
City.hasMany(User, { foreignKey: "cityId", onDelete: "CASCADE" });
User.belongsTo(City, { foreignKey: "cityId" });

City.hasMany(CityForecast, { foreignKey: "cityId", onDelete: "CASCADE" });
CityForecast.belongsTo(City, { foreignKey: "cityId" });

CityForecast.hasMany(WeatherHistory, {
  foreignKey: "cityForecastId",
  onDelete: "CASCADE",
});
WeatherHistory.belongsTo(CityForecast, { foreignKey: "cityForecastId" });

City.hasMany(WeatherForecast, { foreignKey: "cityId", onDelete: "CASCADE" });
CityForecast.hasMany(WeatherForecast, {
  foreignKey: "cityForecastId",
  onDelete: "CASCADE",
});
WeatherForecast.belongsTo(City, { foreignKey: "cityId" });
WeatherForecast.belongsTo(CityForecast, { foreignKey: "cityForecastId" });

// Initialize Sequelize
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database synced successfully!");
    // Start your Express app here
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

const app = express();
app.use(express.json());

// Rotas
app.get("/", (req, res) => {
  res.status(200).send("API server ON");
});

// Usar as rotas de clima
app.use("/api", weatherRoutes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
