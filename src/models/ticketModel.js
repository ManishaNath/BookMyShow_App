// models/ticketModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");
const User = require("./userModel"); // for foreign key reference
// const Ticket = require("./ticketModel");

const Ticket = sequelize.define("Ticket", {
  Ticket_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Ticket;
