const express = require("express");
const router = express.Router();
const cityController = require("../controllers/CityController");

router.get("/city", cityController.getCityByName);

module.exports = router;
