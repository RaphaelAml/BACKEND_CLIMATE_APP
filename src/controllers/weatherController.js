// src/controllers/weatherController.js
const weatherService = require('../services/weatherService');
const WeatherForecast = require('../models/WeatherForecast');
const CityForecast = require('../models/CityForecast');
const City = require('../models/City');

const getWeatherForCity = async (req, res) => {
  const { city } = req.params; // Pegando o nome da cidade da URL
  try {
    const weatherData = await weatherService.getWeatherByCity(city);
    
    // Verifique se a cidade existe no banco de dados
    const cityRecord = await City.findOne({ where: { name: city } });
    
    if (!cityRecord) {
      return res.status(404).json({ error: 'City not found in database' });
    }
    
    // Você pode criar um novo registro CityForecast se necessário
    const cityForecast = await CityForecast.create({
      cityId: cityRecord.id,
      forecastTime: new Date(), // ou outra data que faça sentido
    });

    // Salvar os dados do tempo
    await WeatherForecast.create({
      cityForecastId: cityForecast.id,
      cityId: cityRecord.id,
      temperature: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      temp_min: weatherData.main.temp_min,
      temp_max: weatherData.main.temp_max,
      pressure: weatherData.main.pressure,
      humidity: weatherData.main.humidity,
      visibility: weatherData.visibility,
      wind_speed: weatherData.wind.speed,
      wind_deg: weatherData.wind.deg,
      weather_id: weatherData.weather[0].id,
      weather_main: weatherData.weather[0].main,
      weather_description: weatherData.weather[0].description,
      city_name: weatherData.name,
      country: weatherData.sys.country,
      timestamp: weatherData.dt,
    });

    res.status(200).json(weatherData); // Retorna os dados de clima
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeatherForCity };
