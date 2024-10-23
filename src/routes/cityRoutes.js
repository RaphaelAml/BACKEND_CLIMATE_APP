const express = require("express");
const router = express.Router();
const cityControl = require("../controllers/cityController");

router.post("/weather", cityControl.addCityAndGetWeather); //contexto é de wheather / forecast, mover esse endpoint / metodos agregados para as devidas classes

router.get("/city", cityControl.getCityByName);

module.exports = router;
