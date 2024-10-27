const express = require("express");
const router = express.Router();
const WeatherController = require("../controllers/WheatherController");

router.post("/weather", WeatherController.addCityAndGetWeather);
