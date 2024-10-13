const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const CityForecast = require('./CityForecast');
const City = require('./City');  

class WeatherForecast extends Model {}

WeatherForecast.init({
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  cityId: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'WeatherForecast', 
  tableName: 'weather_forecasts', 
  timestamps: true,
});

module.exports = WeatherForecast;
