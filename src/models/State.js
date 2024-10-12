const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./Country');
const City = require('./City');

class State extends Model {}

State.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  prefix: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  countryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'State',
  tableName: 'states',
  timestamps: true,
});

State.hasMany(City, { foreignKey: 'stateId' });
State.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = State;
