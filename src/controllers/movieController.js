// src/controllers/movieController.js
const movieService = require("../services/movieService");

async function getShowsByMovie(req, res) {
  try {
    const { movieID } = req.params;
    const shows = await movieService.getShowsByMovie(movieID);
    res.json(shows);
  } catch (error) {
    console.error("Error in getShowsByMovie:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getShowsByMovie,
};
