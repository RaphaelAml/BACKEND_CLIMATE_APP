const express = require("express");
const router = express.Router();
const wheatherController = require("../controllers/WheatherController");

router.post("/weather", wheatherController.GetWeatherByCityAndDate);

module.exports = router;
