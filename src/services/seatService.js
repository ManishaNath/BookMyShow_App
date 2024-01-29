// services/seatService.js
const Seat = require("../models/seatModel");

// Inserting into DB - Bulk insert
// Sample data for Seats
const seatList = [
  { Row: "A", Number: 1, Status: "available" },
  { Row: "A", Number: 2, Status: "available" },
  { Row: "B", Number: 1, Status: "available" },
  { Row: "B", Number: 2, Status: "available" },
  // Add more seat data as needed
];

// Bulk insert for Seats
async function bulkInsertSeats() {
  try {
    const res = await Seat.bulkCreate(seatList);
    console.log("Seats bulk inserted:", res);
  } catch (error) {
    console.error("Error bulk inserting seats:", error);
  }
}

// Call the function to bulk insert seats
bulkInsertSeats();

async function bookSeats(theatreId, showId, seats, userId, friendId) {
  try {
    // For simplicity,  assuming seats are available and can be booked

    // Update Redis cache if necessary

    // Example: Updating seat status to 'booked'
    await Seat.update(
      { Status: "booked" },
      {
        where: {
          Screen_ID: {
            // we can uniquely identify a screen by theatreId and showId
            [Op.and]: [{ Theatre_ID: theatreId }, { Show_ID: showId }],
          },
          Seat_ID: { [Op.in]: seats },
          Status: "available", // Ensure the seat is currently available before booking
        },
      }
    );

    return { success: true, message: "Seats booked successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Error booking seats");
  }
}

module.exports = { bookSeats };
