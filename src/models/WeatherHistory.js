const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const CityForecast = require('./CityForecast');
const City = require('./City');

class WeatherHistory extends Model {}

WeatherHistory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cityForecastId: {
    type: DataTypes.INTEGER,
    references: {
      model: CityForecast,
      key: 'id',
    },
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'WeatherHistory',
  tableName: 'weather_history',
  timestamps: true,
});

module.exports = WeatherHistory;