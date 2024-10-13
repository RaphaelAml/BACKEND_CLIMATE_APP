import State from "./State";
import Country from "./Country";
import City from "./City";
import User from "./User";
import WeatherForecast from "./WeatherForecast"; 
import CityForecast from "./CityForecast";
import WeatherHistory from "./WeatherHistory";

// Associations
City.belongsTo(State);
State.belongsTo(Country);
User.belongsTo(City);

WeatherHistory.belongsTo(CityForecast, { foreignKey: 'cityForecastId' });
WeatherHistory.belongsTo(City, { foreignKey: 'cityId' });

City.hasMany(WeatherHistory, { foreignKey: 'cityId', onDelete: 'CASCADE' });
CityForecast.hasMany(WeatherHistory, { foreignKey: 'cityForecastId', onDelete: 'CASCADE' });

WeatherForecast.belongsTo(CityForecast, { foreignKey: 'cityForecastId' });
WeatherForecast.belongsTo(City, { foreignKey: 'cityId' });

City.hasMany(WeatherForecast, { foreignKey: 'cityId', onDelete: 'CASCADE' });
CityForecast.hasMany(WeatherForecast, { foreignKey: 'cityForecastId', onDelete: 'CASCADE' });
