// src/services/screenService.js
const ShowTable = require("../models/showtimeModel");
const Screen = require("../models/screenModel");

// Inserting into DB - Bulk insert
// Sample data for Screens
const screenList = [
  {
    Screen_name: "2D",
    Show_ID: 1, // Assuming Show_ID 1 corresponds to the first movie
  },
  {
    Screen_name: "2D",
    Show_ID: 2, // Assuming Show_ID 2 corresponds to the second movie
  },
  {
    Screen_name: "2D",
    Show_ID: 3, // Assuming Show_ID 3 corresponds to the third movie
  },
  {
    Screen_name: "4D",
    Show_ID: 4, // Assuming Show_ID 4 corresponds to the fourth movie
  },
];

// Bulk insert for Screens
async function bulkInsertScreens() {
  try {
    const res = await Screen.bulkCreate(screenList);
    console.log("Screens bulk inserted:", res);
  } catch (error) {
    console.error("Error bulk inserting screens:", error);
  }
}

// Call the function to bulk insert screens
bulkInsertScreens();

// endpoints//
async function getShowsByScreen(screenID) {
  try {
    return await ShowTable.findAll({
      attributes: ["Show_date", "Show_Time"],
      include: [
        {
          model: Movie,
          attributes: ["Movie_name", "Genres", "Language", "Movie_ratings"],
        },
        {
          model: Theater,
          attributes: ["Theater_name"],
        },
      ],
      where: {
        Screen_ID: screenID,
      },
    });
  } catch (error) {
    console.error("Error in getShowsByScreen service:", error);
    throw error;
  }
}

module.exports = {
  getShowsByScreen,
};
