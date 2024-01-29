// src/controllers/ticketController.js
const ticketService = require("../services/ticketService");

async function getAllTickets(req, res) {
  const ticket = await ticketService.getAllTickets();
  res.json(ticket);
}

module.exports = {
  getAllTickets,
};
