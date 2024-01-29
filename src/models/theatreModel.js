// src/models/theatreModel.js
// Import the sequelize connection from dbconnection file
// Import datatypes from the sequelize library
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

const Theatre = sequelize.define("Theatre", {
  Theatre_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Theatre_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // City_ID: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
});

module.exports = Theatre;
