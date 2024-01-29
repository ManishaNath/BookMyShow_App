// src/dbConnection.js
const { Sequelize } = require("sequelize");

// credentials of MySQL database information
const sequelize = new Sequelize("bookmyshow", "root", "Sql@12345", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5, // max no of connections in pool
    min: 0, // min no. of connections in pool
    acquire: 30000, //max time in ms, before throwing error
    idle: 10000, //max time in ms, that a connection can be idle
  },
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Call the function with await or handle the promise in the caller
testConnection();

module.exports = sequelize;
