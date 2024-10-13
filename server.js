const express = require('express');
const sequelize = require('./src/config/database');
const City = require('./src/models/City');
const User = require('./src/models/User');
const CityForecast = require('./src/models/CityForecast');
const WeatherHistory = require('./src/models/WeatherHistory');
const WeatherForecast = require('./src/models/WeatherForecast'); // Adicionando WeatherForecast

// Associate models
City.hasMany(User, { foreignKey: 'cityId', onDelete: 'CASCADE' });
User.belongsTo(City, { foreignKey: 'cityId' });

City.hasMany(CityForecast, { foreignKey: 'cityId', onDelete: 'CASCADE' });
CityForecast.belongsTo(City, { foreignKey: 'cityId' });

CityForecast.hasMany(WeatherHistory, { foreignKey: 'cityForecastId', onDelete: 'CASCADE' });
WeatherHistory.belongsTo(CityForecast, { foreignKey: 'cityForecastId' });

City.hasMany(WeatherForecast, { foreignKey: 'cityId', onDelete: 'CASCADE' }); // Adicionando associação com WeatherForecast
CityForecast.hasMany(WeatherForecast, { foreignKey: 'cityForecastId', onDelete: 'CASCADE' });
WeatherForecast.belongsTo(City, { foreignKey: 'cityId' });
WeatherForecast.belongsTo(CityForecast, { foreignKey: 'cityForecastId' });

// Initialize Sequelize
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synced successfully!');
    // Start your Express app here
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });
