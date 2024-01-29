// src/routes/screenRoutes.js
const express = require("express");
const screenController = require("../controllers/screenController");

const router = express.Router();

router.get("/", screenController.getShowsByScreen);

module.exports = router;
