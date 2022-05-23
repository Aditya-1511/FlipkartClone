const { Sequelize } = require("sequelize");

async function dbConnection() {
  const sequelize = new Sequelize("instagram_mysql", "Aditya", "Aditya@123", {
    host: "localhost",
    dialect: "mysql",
  });

  try {
    await sequelize.authenticate();
    console.log("MySQL Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  dbConnection,
};
