const axios = require("axios");
const City = require("../models/City");
const WeatherForecast = require("../models/WeatherForecast");
require("dotenv").config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

const addCityAndGetWeather = async (req, res) => {
  const { cityId } = req.body; // Recebe o ID da cidade do front-end

  try {
    // 1. Recupera a cidade pelo ID no banco de dados
    const city = await City.findOne({
      where: { id: cityId },
      include: [{ model: require("../models/State"), include: [require("../models/Country")] }],
    });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // 2. Verifica se a latitude e longitude estão disponíveis
    if (!city.latitude || !city.longitude) {
      console.log("Latitude ou longitude não encontradas. Buscando na API.");

      // 3. Chama a API do OpenWeather para obter os dados da cidade
      const geoResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city.name},BR&appid=${API_KEY}`);
      const geoData = geoResponse.data;

      // Atualiza a latitude e longitude da cidade
      city.latitude = geoData.coord.lat;
      city.longitude = geoData.coord.lon;

      // Salva a cidade atualizada no banco de dados
      await city.save();
    }

    // 4. Chamada à API do OpenWeather usando a latitude e longitude da cidade encontrada
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: city.latitude,
        lon: city.longitude,
        appid: API_KEY,
        units: "metric",
      },
    });

    // 5. Extrair e preparar dados relevantes para o banco de dados
    const weatherData = response.data;
    const weatherForecastData = {
      cityId: city.id,
      city_name: city.name, // Adiciona o nome da cidade
      country: city.State.Country.name, // Adiciona o nome do país
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
      timestamp: weatherData.dt,
    };

    // 6. Salvar dados climáticos na tabela WeatherForecast
    await WeatherForecast.create(weatherForecastData);

    // 7. Retornar resposta com dados climáticos e de localização
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
  addCityAndGetWeather,
};
