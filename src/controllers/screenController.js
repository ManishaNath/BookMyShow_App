// src/controllers/screenController.js
const screenService = require("../services/screenService");

async function getShowsByScreen(req, res) {
  try {
    const { screenID } = req.params;
    const shows = await screenService.getShowsByScreen(screenID);
    res.json(shows);
  } catch (error) {
    console.error("Error in getShowsByScreen:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getShowsByScreen,
};
