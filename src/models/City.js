const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const State = require('./State');
const User = require('./User');
const CityForecast = require('./CityForecast');
const WeatherHistory = require('./WeatherHistory');

class City extends Model {}

City.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  latitude: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  stateId: {
    type: DataTypes.INTEGER,
    references: {
      model: State,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'City',
  tableName: 'cities',
  timestamps: true,
});

// Associações com exclusão em cascata
City.hasMany(WeatherHistory, { foreignKey: 'cityId', onDelete: 'CASCADE' });
City.hasMany(CityForecast, { foreignKey: 'cityId', onDelete: 'CASCADE' });
City.hasMany(User, { foreignKey: 'cityId', onDelete: 'CASCADE' });
City.belongsTo(State, { foreignKey: 'stateId' });

module.exports = City;
