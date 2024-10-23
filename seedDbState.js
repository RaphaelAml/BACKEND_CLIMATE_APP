// seed.js
const sequelize = require("./src/config/database");
const { seedCountryAndStates } = require("./src/config/seedDatabase");

const runSeedState = async () => {
 try {
  await sequelize.sync({ alter: true });
  console.log("Database synced successfully!");

  await seedCountryAndStates();

  console.log("Seeding completed successfully!");
 } catch (error) {
  console.error("Error during seeding:", error);
 } finally {
  await sequelize.close();
 }
};

runSeedState();

