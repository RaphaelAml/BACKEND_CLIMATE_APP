const express = require("express");
const router = express.Router();
const wheatherForecastController = require("../controllers/WeatherForecastController");

router.post("/weather", wheatherForecastController.GetWeatherByCityAndDate);

router.post("/forecast", wheatherForecastController.GetForecastByCityAndDate);

module.exports = router;
