// models/seatModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");
const Screen = require("./screenModel"); // for foreign key reference

const Seat = sequelize.define("Seat", {
  Seat_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Row: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Status: {
    type: DataTypes.ENUM("available", "booked"),
    allowNull: false,
    defaultValue: "available",
  },
});

module.exports = Seat;

// Seat.belongsTo(Screen, { foreignKey: "Screen_ID" });
