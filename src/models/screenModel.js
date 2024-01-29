// src/models/screenModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");
const ShowTable = require("./showtimeModel"); // for foreign key reference
const Seat = require("./seatModel"); // for foreign key reference

const Screen = sequelize.define("Screen", {
  Screen_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Screen_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Show_ID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// // Define associations
// Screen.hasMany(ShowTable, { foreignKey: "Show_ID" });
// Screen.hasMany(Seat, { foreignKey: "Screen_ID" }); // Correct association

// Logging messages to check Screen table creation
sequelize
  .sync()
  .then(() => {
    console.log("Screen table synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing Screen table:", error);
  });

module.exports = Screen;
