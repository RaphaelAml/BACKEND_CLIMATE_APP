const axios = require('axios'); 
const City = require('../models/City'); 

// Adicionar cidade
const addCity = async (req, res) => {
    const { name } = req.body; // Pegue apenas o nome da cidade do corpo da requisição
  
    try {
    
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b7087c46c48a5f8204d2a390912ac7fc`);
      const { lat, lon } = response.data.coord; // Extraia latitude e longitude da resposta
  
      // Agora você pode criar a cidade com as coordenadas
      const city = await City.create({
        name,
        latitude: lat,
        longitude: lon,
      });
  
      res.status(201).json(city);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error adding city' });
    }
  };

// Obter todas as cidades
const getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll();
    return res.status(200).json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return res.status(500).json({ error: 'Failed to fetch cities' });
  }
};

// Obter cidade por ID
const getCityById = async (req, res) => {
  const { id } = req.params; // Pegando o ID da URL
  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }
    return res.status(200).json(city);
  } catch (error) {
    console.error('Error fetching city:', error);
    return res.status(500).json({ error: 'Failed to fetch city' });
  }
};

// Atualizar cidade
const updateCity = async (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude } = req.body;

  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    // Atualizando a cidade
    city.name = name;
    city.latitude = latitude;
    city.longitude = longitude;
    await city.save();

    return res.status(200).json(city);
  } catch (error) {
    console.error('Error updating city:', error);
    return res.status(500).json({ error: 'Failed to update city' });
  }
};

// Deletar cidade
const deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ error: 'City not found' });
    }

    await city.destroy(); // Deletando a cidade
    return res.status(200).json({ message: `Cidade '${city.name}' foi apagada com sucesso!` });
  } catch (error) {
    console.error('Error deleting city:', error);
    return res.status(500).json({ error: 'Failed to delete city' });
  }
};

module.exports = { addCity, getAllCities, getCityById, updateCity, deleteCity };
