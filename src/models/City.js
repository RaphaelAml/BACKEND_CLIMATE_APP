const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const State = require("./State");

class City extends Model {}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    latitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: false,
    },
    stateId: {
      type: DataTypes.INTEGER,
      references: {
        model: State,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "City",
    tableName: "city",
  }
);

module.exports = City;
