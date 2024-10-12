const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const City = require('./City');
const WeatherForecast = require('./WeatherForecast');

class CityForecast extends Model {}

CityForecast.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  modelName: 'CityForecast',
  tableName: 'city_forecasts',
  timestamps: true,
});

CityForecast.belongsTo(City, { foreignKey: 'cityId' });
CityForecast.hasMany(WeatherForecast, { foreignKey: 'cityForecastId' });

module.exports = CityForecast;
