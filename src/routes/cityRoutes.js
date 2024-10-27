const express = require("express");
const router = express.Router();
const cityControl = require("../controllers/cityController");
const cityController = require("../controllers/wheatherForecastController");
const weatherController = require("../controllers/wheatherForecastController");

router.post("/weather", cityController.addCityAndGetWeather); //contexto é de wheather / forecast, mover esse endpoint / metodos agregados para as devidas classes

router.get("/city", cityControl.getCityByName);

router.post("/weather", weatherController.addCityAndGetWeather);

module.exports = router;
