// src/models/showtimeModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

// for foreign key reference
const Movie = require("./movieModel");
const Theatre = require("./theatreModel");

const ShowTable = sequelize.define("ShowTable", {
  Show_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Show_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Show_Time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Movie_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Theatre_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// // Defining Associations
// ShowTable.belongsTo(Movie, { foreignKey: "Movie_ID" });
// ShowTable.belongsTo(Theatre, { foreignKey: "Theatre_ID" });

module.exports = ShowTable;
