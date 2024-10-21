const axios = require("axios");

const City = require("../models/City");
const State = require("../models/State");
const Country = require("../models/Country");
const WeatherForecast = require("../models/WeatherForecast");

require("dotenv").config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

const getCityByName = async (req, res) => {
  console.log("Received request for city:", req.query);
  const { name } = req.query;
  try {
    const city = await City.findOne({ where: { name } });
    if (!city) {
      return res.status(404).json({ error: "City not found!" });
    }
    const weather = await WeatherForecast.findOne({
      where: { cityId: city.id },
    });
    return res.json({ city: city.name, weather });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

// Função para adicionar uma cidade e buscar o clima
const addCityAndGetWeather = async (req, res) => {
  console.log("Received request POST for city:", req.query);
  const { cityName, stateName, countryName, latitude, longitude } = req.body; // Receber dados da cidade, estado e país no corpo da requisição

  try {
    // 1. Verificar se o país existe, se não, criar
    let country = await Country.findOne({ where: { name: countryName } });
    if (!country) {
      country = await Country.create({ name: countryName });
    }

    // 2. Verificar se o estado existe, se não, criar
    let state = await State.findOne({
      where: { name: stateName, countryId: country.id },
    });
    if (!state) {
      state = await State.create({ name: stateName, countryId: country.id });
    }

    // 3. Verificar se a cidade já existe, se não, criar
    let city = await City.findOne({ where: { name: cityName } });
    if (!city) {
      city = await City.create({
        name: cityName,
        latitude: latitude, // Assumindo que a latitude é passada no corpo da requisição
        longitude: longitude, // Assumindo que a longitude é passada no corpo da requisição
        stateId: state.id,
      });
    }

    // 4. Fazer chamada para a API do OpenWeather
    const { latitude: lat, longitude: lon } = city; // Use latitude e longitude da cidade encontrada
    const response = await axios.get(
      process.env.OPENWEATHER_API_URL,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric", // Mudar para 'imperial' ou 'standard' se necessário
        },
      }
    );

    // 5. Extrair dados relevantes da resposta
    const weatherData = response.data;
    const weatherForecastData = {
      cityId: city.id,
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
      city_name: city.name,
      state_name: state.name,
      country: country.name,
      timestamp: weatherData.dt,
    };

    // 6. Salvar previsão do tempo no banco de dados
    await WeatherForecast.create(weatherForecastData);

    // 7. Retornar os dados
    return res.json({
      city: city.name,
      state: state.name, // Retornando o nome do estado
      country: country.name,
      weather: weatherForecastData, // Mudança aqui para retornar os dados de previsão
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Backend error." });
  }
};

module.exports = {
  addCityAndGetWeather,
  getCityByName
};
