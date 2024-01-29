// src/controllers/cityController.js
const cityService = require("../services/cityService");

async function getAllCity(req, res) {
  const city = await cityService.getAllCity();
  res.json(city);
}

module.exports = {
  getAllCity,
};
