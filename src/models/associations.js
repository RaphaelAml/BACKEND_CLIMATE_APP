// src/models/associations.js
const City = require('./City');
const User = require('./User');
const CityForecast = require('./CityForecast');
const WeatherForecast = require('./WeatherForecast');
const WeatherHistory = require('./WeatherHistory');

// Associações
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
