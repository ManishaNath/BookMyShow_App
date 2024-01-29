// src/controllers/theatreController.js
const UserService = require("../services/userService");

async function getAllUsers(req, res) {
  const users = await UserService.getAllUsers();
  res.json(users);
}

module.exports = {
  getAllUsers,
};
