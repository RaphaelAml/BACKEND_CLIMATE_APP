const City = require("./City");
const User = require("./User");
const CityForecast = require("./CityForecast");
const WeatherForecast = require("./WeatherForecast");
const WeatherHistory = require("./WeatherHistory");
const State = require("./State"); // Importe o modelo State
const Country = require("./Country"); // Importe o modelo Country

// Country e State
Country.hasMany(State, { foreignKey: "countryId", onDelete: "CASCADE" });
State.belongsTo(Country, { foreignKey: "countryId" });

// State e City
State.hasMany(City, { foreignKey: "stateId", onDelete: "CASCADE" });
City.belongsTo(State, { foreignKey: "stateId" });

// City e User
City.hasMany(User, { foreignKey: "cityId", onDelete: "CASCADE" });
User.belongsTo(City, { foreignKey: "cityId" });

// City e CityForecast
City.hasMany(CityForecast, { foreignKey: "cityId", onDelete: "CASCADE" });
CityForecast.belongsTo(City, { foreignKey: "cityId" });

// CityForecast e WeatherHistory
CityForecast.hasMany(WeatherHistory, {
  foreignKey: "cityForecastId",
  onDelete: "CASCADE",
});
WeatherHistory.belongsTo(CityForecast, { foreignKey: "cityForecastId" });

// City e WeatherForecast
City.hasMany(WeatherForecast, { foreignKey: "cityId", onDelete: "CASCADE" });
WeatherForecast.belongsTo(City, { foreignKey: "cityId" });

// CityForecast e WeatherForecast
CityForecast.hasMany(WeatherForecast, {
  foreignKey: "cityForecastId",
  onDelete: "CASCADE",
});
WeatherForecast.belongsTo(CityForecast, { foreignKey: "cityForecastId" });
