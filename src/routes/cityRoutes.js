const express = require("express");
const router = express.Router();
const cityControl = require("../controllers/CityController");

router.get("/city", cityControl.getCityByName);

module.exports = router;
