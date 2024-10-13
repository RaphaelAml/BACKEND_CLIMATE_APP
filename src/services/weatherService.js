const axios = require('axios');
const WeatherForecast = require('../models/WeatherForecast'); 

const API_KEY = 'b7087c46c48a5f8204d2a390912ac7fc'; 
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

const getWeatherByCity = async (cityName) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${cityName}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

const saveWeatherData = async (data, cityForecastId, cityId) => {
  try {
    const weatherForecast = await WeatherForecast.create({
      cityForecastId: cityForecastId,
      cityId: cityId,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      visibility: data.visibility,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      weather_id: data.weather[0].id,
      weather_main: data.weather[0].main,
      weather_description: data.weather[0].description,
      city_name: data.name,
      country: data.sys.country,
      timestamp: data.dt,
    });

    return weatherForecast;
  } catch (error) {
    console.error('Error saving weather data:', error);
    throw error; // Lançar o erro para ser tratado no controller
  }
};

module.exports = { getWeatherByCity, saveWeatherData }; // Exporte a nova função
