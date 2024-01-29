// src/routes/theatreRoutes.js
const express = require("express");
const theatreController = require("../controllers/theatreController");

const router = express.Router();

//As a user, I can select any theatre in the city. On selecting the theatre, I should be able to see the dates of next 7 days.
router.get("/all", theatreController.getAllTheatres);
router.get("/:theatreID/dates", theatreController.getDatesForTheatre);
router.get("/:theatreID/movies/:date", theatreController.getMoviesForDate);

module.exports = router;
