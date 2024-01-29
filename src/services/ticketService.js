// services/ticketService.js
const Ticket = require("../models/ticketModel");

// Inserting into DB - Bulk insert for TicketTable
const ticketList = [
  { TicketID: 789, User_ID: 9876, Show_ID: 1 },
  { TicketID: 456, User_ID: 8765, Show_ID: 2 },
  { TicketID: 314, User_ID: 7654, Show_ID: 3 },
  { TicketID: 255, User_ID: 6543, Show_ID: 4 },
];

async function bulkInsertTickets() {
  try {
    const res = await Ticket.bulkCreate(ticketList);
    console.log("Tickets bulk inserted:", res);
  } catch (error) {
    console.error("Error bulk inserting tickets:", error);
  }
}

// Call the function to bulk insert tickets
bulkInsertTickets();

async function getAllTickets() {
  return await Theatre.findAll();
}

module.exports = {
  getAllTickets,
};
