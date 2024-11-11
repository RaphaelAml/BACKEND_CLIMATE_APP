const express = require("express");
const router = express.Router();
const weatherForecastController = require("../controllers/WeatherForecastController");

router.post("/weather", weatherForecastController.GetWeatherByCityAndDate);

router.post("/forecast", weatherForecastController.GetForecastByCityAndDate);

module.exports = router;
