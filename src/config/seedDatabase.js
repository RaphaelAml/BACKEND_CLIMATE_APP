const axios = require("axios");
const Country = require("../models/Country");
const State = require("../models/State");
const City = require("../models/City");
const sequelize = require("./DatabaseConfig");

const seedCountryAndStates = async () => {
  try {
    let brasil = await Country.findOne({ where: { name: "Brasil" } });
    if (!brasil) {
      brasil = await Country.create({ name: "Brasil" });
    }

    const response = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    const estados = response.data;

    for (const estado of estados) {
      await State.upsert({
        id: estado.id,
        name: estado.nome,
        prefixo: estado.sigla,
        countryId: brasil.id,
      });
    }

    console.log("Dados dos estados inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await sequelize.close();
  }
};

async function seedCities() {
  try {
    const saoPauloState = await State.findOne({ where: { prefixo: "SP" } });
    if (!saoPauloState) {
      console.log("Estado de São Paulo não encontrado.");
      return;
    }

    // get que retorna cidades de SP (id 35 no ibge)
    const response = await axios.get(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/distritos"
    );

    const citiesData = response.data;

    const cityInserts = citiesData.map(async (city) => {
      try {
        await City.create({
          name: city.nome,
          latitude: null,
          longitude: null,
          stateId: saoPauloState.id,
        });
      } catch (err) {
        console.error(`Erro ao inserir cidade: ${city.nome}`, err);
      }
    });

    await Promise.all(cityInserts);

    console.log("Seed de cidades concluído!");
  } catch (error) {
    console.error("Erro ao buscar dados de cidades do IBGE:", error);
  }
}

module.exports = { seedCountryAndStates, seedCities };
