const axios = require("axios");

class WeatherService {
  static async getWeatherData(city) {
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

    const weatherData = response.data;
    return {
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
    };
  }
}

module.exports = WeatherService;
