// src/routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/all", userController.getAllUsers);

module.exports = router;
