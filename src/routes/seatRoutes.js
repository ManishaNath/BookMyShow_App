// src/routes/seatRoutes.js
const express = require("express");
const bookSeatsController = require("../controllers/seatController");

const router = express.Router();

//an API to book seats for you and you friend for a given theatre and a show.
router.post("/book-seats", bookSeatsController.bookSeats);

module.exports = router;
