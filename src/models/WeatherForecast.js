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
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  feels_like: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  temp_min: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  temp_max: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  pressure: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  humidity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  visibility: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  wind_speed: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  wind_deg: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weather_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weather_main: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weather_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'WeatherForecast', 
  tableName: 'weather_forecasts', 
  timestamps: true,
});

module.exports = WeatherForecast;