// models/cityModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

const City = sequelize.define("City", {
  City_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  City_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = City;
