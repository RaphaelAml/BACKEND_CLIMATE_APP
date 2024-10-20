const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class CityForecast extends Model {}

CityForecast.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "city", // Nome da tabela de cidades
        key: "id",
      },
      onDelete: "CASCADE", // Caso a cidade seja deletada, as previsões devem ser deletadas também
    },
    forecastTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CityForecast",
    tableName: "city_forecasts",
    timestamps: true,
  }
);

module.exports = CityForecast;
