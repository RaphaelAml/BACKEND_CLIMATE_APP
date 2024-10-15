const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { getWeatherForCity } = require('../controllers/weatherController'); 


// Rota para pegar o clima de uma cidade (e cadastrar se não existir)
router.get('/weather/:city', getWeatherForCity); // Use a função correta como callback

module.exports = router;
