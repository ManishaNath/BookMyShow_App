// src/models/movieModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

const Movie = sequelize.define("Movie", {
  Movie_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Movie_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Total_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Genres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Movie_ratings: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Movie;
