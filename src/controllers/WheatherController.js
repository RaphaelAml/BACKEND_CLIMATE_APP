require("dotenv").config();
const CityService = require("../services/CityService");
const WeatherService = require("../services/WeatherService");
const ForecastService = require("../services/ForecastService");

const GetWeatherByCityAndDate = async (req, res) => {
  const { cityName, date } = req.body;

  try {
    const paramDate = new Date(date);
    if (isNaN(paramDate.getTime())) {
      return res.status(400).json({ error: "Data inválida." });
    }

    const city = await CityService.getCityByName(cityName);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    await CityService.updateCityCoordinates(city);
    const weatherData = await WeatherService.getWeatherData(city);

    const weatherForecastData = {
      cityId: city.id,
      city_name: city.name,
      country: city.State.Country.name,
      timestamp: Math.floor(paramDate.getTime() / 1000),
      ...weatherData,
    };

    const cityForecast = await ForecastService.getOrCreateForecast(
      city.id,
      paramDate
    );
    const existingWeatherForecast = await ForecastService.getWeatherForecast(
      city.id,
      cityForecast.id,
      weatherForecastData.timestamp
    );

    if (existingWeatherForecast) {
      await existingWeatherForecast.update(weatherForecastData);
    } else {
      await ForecastService.createWeatherForecast(weatherForecastData);
    }

    return res.json({
      city: city.name,
      state: city.State.name,
      country: city.State.Country.name,
      weather: weatherForecastData,
    });
  } catch (error) {
    console.error("Error fetching or saving weather data:", error);
    return res.status(500).json({ message: "Backend error." });
  }
};

module.exports = {
  GetWeatherByCityAndDate,
};
