// src/routes/showtimeRoutes.js
const express = require("express");
const showtimeController = require("../controllers/showtimeController");

const router = express.Router();

router.get("/:date/:theatreID", showtimeController.getShowsByDateAndTheatre);

module.exports = router;
