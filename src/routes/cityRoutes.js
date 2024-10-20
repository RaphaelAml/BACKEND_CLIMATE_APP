const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// Rota para adicionar uma cidade e buscar clima
router.post('/weather', cityController.addCityAndGetWeather);

module.exports = router;
