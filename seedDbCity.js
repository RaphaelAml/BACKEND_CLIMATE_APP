const sequelize = require("./src/config/DatabaseConfig");
const { seedCities } = require("./src/config/SeedDatabase");

const runSeedCity = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully!");

    await seedCities();

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await sequelize.close();
  }
};

runSeedCity();
