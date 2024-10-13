const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');


router.post('/city', cityController.addCity); 
router.get('/cities', cityController.getAllCities);
router.get('/city/:id', cityController.getCityById);
router.put('/city/:id', cityController.updateCity);
router.delete('/city/:id', cityController.deleteCity);

module.exports = router;
