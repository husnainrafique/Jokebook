const { Sequelize } = require("sequelize");

// Create a Sequelize instance and connect to the SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./jokebook.sqlite",
});

module.exports = sequelize;
