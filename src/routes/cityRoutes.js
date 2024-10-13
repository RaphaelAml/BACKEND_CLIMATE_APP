const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.post('/city', cityController.addCity); // Rota para adicionar uma cidade

module.exports = router;
