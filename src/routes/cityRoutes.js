const express = require("express");
const router = express.Router();
const cityControl = require("../controllers/cityController");

router.post("/weather", cityControl.addCityAndGetWeather);

router.get("/weather/city", cityControl.getCityByName);

module.exports = router;
