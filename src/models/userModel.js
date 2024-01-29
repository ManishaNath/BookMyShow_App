// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");
// const User = require("./userModel"); // for foreign key reference

const User = sequelize.define("User", {
  User_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
// User.hasMany(Ticket, { foreignKey: "User_ID" });

module.exports = User;
