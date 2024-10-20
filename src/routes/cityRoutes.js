const express = require("express");
const router = express.Router();

const citiControl = require("../controllers/cityController");

router.post("/weather", citiControl.addCityAndGetWeather);

router.get("/api/weather/city", citiControl.getCityByName);

module.exports = router;
