const axios = require("axios");
const City = require("../models/City");
const WeatherForecast = require("../models/WeatherForecast");
const CityForecast = require("../models/CityForecast");
require("dotenv").config();
const { Op } = require("sequelize");

const API_KEY = process.env.OPENWEATHER_API_KEY;

const GetWeatherByCityAndDate = async (req, res) => {
  const { cityName, date } = req.body; // Recebe o nome da cidade e a data do front-end

  try {
    // Converte a data recebida em um objeto Date
    const paramDate = new Date(date);

    // Verifica se a data é válida
    if (isNaN(paramDate.getTime())) {
      return res.status(400).json({ error: "Data inválida." });
    }

    // Converte para timestamp em segundos
    const parsedDate = Math.floor(paramDate.getTime() / 1000);

    // 1. Recupera a cidade pelo nome no banco de dados
    const city = await City.findOne({
      where: { name: cityName },
      include: [
        {
          model: require("../models/State"),
          include: [require("../models/Country")],
        },
      ],
    });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // 2. Verifica se a latitude e longitude estão disponíveis
    if (!city.latitude || !city.longitude) {
      console.log("Latitude ou longitude não encontradas. Buscando na API.");

      // 3. Chama a API do OpenWeather para obter os dados da cidade
      const geoResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city.name},BR&appid=${API_KEY}`
      );
      const geoData = geoResponse.data;

      // Atualiza a latitude e longitude da cidade
      city.latitude = geoData.coord.lat;
      city.longitude = geoData.coord.lon;

      // Salva a cidade atualizada no banco de dados
      await city.save();
    }

    // 4. Chamada à API do OpenWeather usando a latitude e longitude da cidade encontrada
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: city.latitude,
          lon: city.longitude,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    // 5. Extrair e preparar dados relevantes para o banco de dados
    const weatherData = response.data;

    // 6. Buscar ou criar uma entrada na tabela CityForecast
    let cityForecast = await CityForecast.findOne({
      where: { cityId: city.id },
    });

    if (!cityForecast) {
      // Se a entrada não existir, cria uma nova
      cityForecast = await CityForecast.create({
        cityId: city.id,
        forecastTime: new Date(date), // ou qualquer lógica de data que você queira usar
      });
    }

    const weatherForecastData = {
      cityId: city.id,
      cityForecastId: cityForecast.id, // Use o id da CityForecast
      city_name: city.name,
      country: city.State.Country.name,
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

    // 7. Verificar se já existe uma previsão do tempo para esta cidade e data
    const existingWeatherForecast = await WeatherForecast.findOne({
      where: {
        cityId: city.id,
        cityForecastId: cityForecast.id,
        timestamp: parsedDate,
      },
    });

    if (existingWeatherForecast) {
      // Atualiza os dados existentes
      await existingWeatherForecast.update(weatherForecastData);
    } else {
      // Salvar novos dados climáticos na tabela WeatherForecast
      await WeatherForecast.create(weatherForecastData);
    }

    // 8. Retornar resposta com dados climáticos e de localização
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

const GetForecastByCityAndDate = async (req, res) => {
  const { cityName } = req.body;

  try {
    // 1. Recupera a cidade pelo nome no banco de dados
    const city = await City.findOne({
      where: { name: cityName },
      include: [
        {
          model: require("../models/State"),
          include: [require("../models/Country")],
        },
      ],
    });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // 2. Verifica se a latitude e longitude estão disponíveis
    if (!city.latitude || !city.longitude) {
      console.log("Latitude ou longitude não encontradas. Buscando na API.");
      const geoResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city.name},BR&appid=${API_KEY}`
      );
      const geoData = geoResponse.data;

      // Atualiza a latitude e longitude da cidade
      city.latitude = geoData.coord.lat;
      city.longitude = geoData.coord.lon;
      await city.save();
    }

    // 3. Chamada à API do OpenWeather para obter previsão de 5 dias
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          lat: city.latitude,
          lon: city.longitude,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    const forecasts = response.data.list;
    const forecastEntries = [];

    // 4. Processa cada entrada da previsão de 5 dias
    for (const forecast of forecasts) {
      const forecastDate = new Date(forecast.dt * 1000);

      // 5. Buscar ou criar uma entrada na tabela CityForecast
      let cityForecast = await CityForecast.findOne({
        where: { cityId: city.id, forecastTime: forecastDate },
      });

      if (!cityForecast) {
        cityForecast = await CityForecast.create({
          cityId: city.id,
          forecastTime: forecastDate,
        });
      }

      // Dados de previsão do tempo formatados
      const weatherForecastData = {
        cityId: city.id,
        cityForecastId: cityForecast.id,
        city_name: city.name,
        country: city.State.Country.name,
        temperature: forecast.main.temp,
        feels_like: forecast.main.feels_like,
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        pressure: forecast.main.pressure,
        humidity: forecast.main.humidity,
        visibility: forecast.visibility || 10000,
        wind_speed: forecast.wind.speed,
        wind_deg: forecast.wind.deg,
        weather_id: forecast.weather[0].id,
        weather_main: forecast.weather[0].main,
        weather_description: forecast.weather[0].description,
        timestamp: forecast.dt,
      };

      // Verifica se já existe uma previsão para esta cidade e data
      const existingWeatherForecast = await WeatherForecast.findOne({
        where: {
          cityId: city.id,
          cityForecastId: cityForecast.id,
          timestamp: forecast.dt,
        },
      });

      if (existingWeatherForecast) {
        await existingWeatherForecast.update(weatherForecastData);
      } else {
        await WeatherForecast.create(weatherForecastData);
      }

      // Adiciona a previsão à lista para o retorno
      forecastEntries.push(weatherForecastData);
    }

    // 6. Retorna todas as previsões processadas
    return res.json({
      city: city.name,
      state: city.State.name,
      country: city.State.Country.name,
      forecasts: forecastEntries,
    });
  } catch (error) {
    console.error("Error fetching or saving weather data:", error);
    return res.status(500).json({ message: "Backend error." });
  }
};

module.exports = {
  GetWeatherByCityAndDate,
  GetForecastByCityAndDate,
};
