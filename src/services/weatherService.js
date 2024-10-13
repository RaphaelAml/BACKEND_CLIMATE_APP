const axios = require('axios');

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

module.exports = { getWeatherByCity };
