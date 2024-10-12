const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const State = require('./State');

class Country extends Model {}

Country.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Country',
  tableName: 'countries',
  timestamps: true,
});

Country.hasMany(State, { foreignKey: 'countryId' });

module.exports = Country;
