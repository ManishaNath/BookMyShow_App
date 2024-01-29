// src/controllers/showtimeController.js
const ShowTimeService = require("../services/showtimeService");

async function getShowsByDateAndTheatre(req, res) {
  const { date, theatreID } = req.params;
  const shows = await ShowTimeService.getShowsByDateAndTheatre(date, theatreID);
  res.json(shows);
}

module.exports = {
  getShowsByDateAndTheatre,
};
