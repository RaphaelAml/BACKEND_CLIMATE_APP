const City = require('../models/City'); // Importando o modelo City

const addCity = async (req, res) => {
  const { name, latitude, longitude } = req.body; // Pegando o nome da cidade do corpo da requisição
  try {
    // Verifica se a cidade já existe
    const existingCity = await City.findOne({ where: { name } });
    if (existingCity) {
      return res.status(400).json({ error: 'City already exists' });
    }

    // Cria a nova cidade
    const newCity = await City.create({ name, latitude, longitude});
    return res.status(201).json(newCity); // Retorna a cidade criada
  } catch (error) {
    console.error('Error adding city:', error);
    return res.status(500).json({ error: 'Failed to add city' });
  }
};

module.exports = { addCity };
