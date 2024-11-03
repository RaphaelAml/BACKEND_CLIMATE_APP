const axios = require("axios");
const { City } = require("../models/City");
const { State } = require("../models/State");
const { Country } = require("../models/Country");

class CityService {
  static async getCityByName(cityName) {
    return await City.findOne({
      where: { name: cityName },
      include: [
        {
          model: State,
          include: Country,
        },
      ],
    });
  }

  static async updateCityCoordinates(city) {
    if (!city.latitude || !city.longitude) {
      console.log("Latitude ou longitude não encontradas. Buscando na API.");
      const geoResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city.name},BR&appid=${API_KEY}`
      );
      const geoData = geoResponse.data;
      city.latitude = geoData.coord.lat;
      city.longitude = geoData.coord.lon;
      await city.save();
    }
  }
}

module.exports = CityService;
