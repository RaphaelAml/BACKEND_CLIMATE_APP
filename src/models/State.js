const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./Country');

class State extends Model {}

State.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  prefixo: DataTypes.STRING,
  countryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'State',
  tableName: 'state',
});

module.exports = State;