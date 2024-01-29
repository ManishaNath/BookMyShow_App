// src/controllers/theatreController.js
const theatreService = require("../services/theatreService");

async function getAllTheatres(req, res) {
  try {
    const theatres = await theatreService.getAllTheatres();
    res.json(theatres);
  } catch (error) {
    console.error("Error fetching theatres:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getDatesForTheatre(req, res) {
  try {
    const { theatreID } = req.params;
    const dates = await theatreService.getDatesForTheatre(theatreID);
    res.json(dates);
  } catch (error) {
    console.error("Error fetching dates for theatre:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMoviesForDate(req, res) {
  try {
    const { theatreID, date } = req.params;
    const movies = await theatreService.getMoviesForDate(theatreID, date);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies for date:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllTheatres,
  getDatesForTheatre,
  getMoviesForDate,
};
