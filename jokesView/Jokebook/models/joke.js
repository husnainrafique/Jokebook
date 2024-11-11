// models/joke.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Category = require("./category");

const Joke = sequelize.define(
  "joke",
  {
    setup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Joke.belongsTo(Category, { foreignKey: "category_id" });

module.exports = Joke;
