const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/DatabaseConfig");
const City = require("./City");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      references: {
        model: City,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
  }
);

module.exports = User;
