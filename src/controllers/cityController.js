const { Op } = require('sequelize');
const City = require("../models/City");

const getCityByName = async (req, res) => {
  console.log("Received request for city:", req.query);

  const { name } = req.query;

  try {
    const cities = await City.findAll({
      where: {
        name: {
         [Op.iLike]: `${name}%`
        }
      },
      limit: 15 //limite de sugestoes retornadas 
    });

    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getCityByName
};
