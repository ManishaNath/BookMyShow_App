// src/routes/theatreRoutes.js
const express = require("express");
const ticketController = require("../controllers/ticketController");

const router = express.Router();

router.get("/all", ticketController.getAllTickets);

module.exports = router;
