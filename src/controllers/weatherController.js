const axios = require('axios');
const weatherService = require('../services/weatherService');
const WeatherForecast = require('../models/WeatherForecast');
const CityForecast = require('../models/CityForecast');
const City = require('../models/City');

// Função para buscar os dados de clima da cidade via API OpenWeatherMap
async function fetchCityData(cityName) {
  const apiKey = 'b7087c46c48a5f8204d2a390912ac7fc'; 
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);
  const data = response.data;

  return {
    name: data.name,
    latitude: data.coord.lat,
    longitude: data.coord.lon,
    weather: data,
  };
}

const getWeatherForCity = async (req, res) => {
  const { city } = req.params; // Pegando o nome da cidade da URL

  try {
    // Verifica se a cidade já existe no banco de dados
    let cityRecord = await City.findOne({ where: { name: city } });

    if (!cityRecord) {
      // Se a cidade não existir, busca na API e salva no banco
      const cityData = await fetchCityData(city);
      cityRecord = await City.create({
        name: cityData.name,
        latitude: cityData.latitude,
        longitude: cityData.longitude,
      });
    }

    // Busca os dados climáticos da API OpenWeatherMap
    const weatherData = await fetchCityData(city);

    // Cria um novo registro CityForecast
    const cityForecast = await CityForecast.create({
      cityId: cityRecord.id,
      forecastTime: new Date(), // ou outra data que faça sentido
    });

    // Salva os dados do clima no banco de dados
    await WeatherForecast.create({
      cityForecastId: cityForecast.id,
      cityId: cityRecord.id,
      temperature: weatherData.weather.main.temp,
      feels_like: weatherData.weather.main.feels_like,
      temp_min: weatherData.weather.main.temp_min,
      temp_max: weatherData.weather.main.temp_max,
      pressure: weatherData.weather.main.pressure,
      humidity: weatherData.weather.main.humidity,
      visibility: weatherData.weather.visibility,
      wind_speed: weatherData.weather.wind.speed,
      wind_deg: weatherData.weather.wind.deg,
      weather_id: weatherData.weather.weather[0].id,
      weather_main: weatherData.weather.weather[0].main,
      weather_description: weatherData.weather.weather[0].description,
      city_name: weatherData.weather.name,
      country: weatherData.weather.sys.country,
      timestamp: weatherData.weather.dt,
    });

    // Retorna os dados climáticos
    res.status(200).json(weatherData.weather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeatherForCity };
