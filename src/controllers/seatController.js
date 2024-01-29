// controllers/seatController.js
const seatService = require("../services/seatService");

async function bookSeats(req, res) {
  try {
    const { theatreId, showId, seats, userId, friendId } = req.body;

    // Book seats for the user
    const userBooking = await seatService.bookSeats(
      theatreId,
      showId,
      seats,
      userId
    );

    // Book seats for the friend
    const friendBooking = await seatService.bookSeats(
      theatreId,
      showId,
      seats,
      friendId
    );

    // Return success response
    res.json({
      success: true,
      message: "Seats booked successfully for both user and friend",
      userBooking,
      friendBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = { bookSeats };
