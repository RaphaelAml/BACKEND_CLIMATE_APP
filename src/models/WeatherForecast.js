const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const CityForecast = require('./CityForecast');

class WeatherForecast extends Model {}

WeatherForecast.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  forecastTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  conditionDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  humidity: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  windSpeed: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  forecast: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'WeatherForecast',
  tableName: 'weather_forecasts',
  timestamps: true,
});

WeatherForecast.belongsTo(CityForecast, { foreignKey: 'cityForecastId' });

module.exports = WeatherForecast;
