const weatherService = require('../services/weatherService');

const getWeatherForCity = async (req, res) => {
  const { city } = req.params; // Pegando o nome da cidade da URL
  try {
    const weatherData = await weatherService.getWeatherByCity(city);
    res.status(200).json(weatherData); // Retorna os dados de clima
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

module.exports = { getWeatherForCity };
