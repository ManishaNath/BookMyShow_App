// src/routes/cityRoutes.js
const express = require("express");
const cityController = require("../controllers/cityController");

const router = express.Router();

router.get("/all", cityController.getAllCity);

module.exports = router;
