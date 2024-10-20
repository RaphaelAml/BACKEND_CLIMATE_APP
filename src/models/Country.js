const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

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
  modelName: 'Coauntry',
  tableName: 'countries',
  timestamps: true,
});

module.exports = Country;