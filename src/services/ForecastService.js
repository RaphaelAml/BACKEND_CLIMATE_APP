const { CityForecast } = require("../models/CityForecast");
const { WeatherForecast } = require("../models/WeatherForecast");

class ForecastService {
  static async getOrCreateForecast(cityId, paramDate) {
    let cityForecast = await CityForecast.findOne({ where: { cityId } });
    if (!cityForecast) {
      cityForecast = await CityForecast.create({
        cityId,
        forecastTime: paramDate,
      });
    }
    return cityForecast;
  }

  static async getWeatherForecast(cityId, cityForecastId, timestamp) {
    return await WeatherForecast.findOne({
      where: {
        cityId,
        cityForecastId,
        timestamp,
      },
    });
  }

  static async createWeatherForecast(data) {
    return await WeatherForecast.create(data);
  }
}

module.exports = ForecastService;
