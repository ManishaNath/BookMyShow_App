// src/services/cityService.js
const City = require("../models/cityModel");

// Inserting into DB - Bulk insert for City
const cityList = [
  { City_ID: "76", City_name: "Bangalore" },
  { City_ID: "89", City_name: "Bangalore" },
  { City_ID: "45", City_name: "Bangalore" },
  { City_ID: "32", City_name: "Bangalore" },
];

async function bulkInsertCities() {
  try {
    const res = await City.bulkCreate(cityList);
    console.log("Cities bulk inserted:", res);
  } catch (error) {
    console.error("Error bulk inserting cities:", error);
  }
}

// Call the function to bulk insert cities
bulkInsertCities();

async function getAllCity() {
  return await Theatre.findAll();
}

module.exports = {
  getAllCity,
};
