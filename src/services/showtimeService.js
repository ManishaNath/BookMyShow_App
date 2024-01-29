// src/services/showtimeService.js
const ShowTable = require("../models/showtimeModel");
const Movie = require("../models/movieModel");
const Theatre = require("../models/theatreModel");
const moment = require("moment");
// Sample data for ShowTable
const showList = [
  {
    Show_date: moment("2024-01-23", "YYYY-MM-DD").toDate(),
    Show_Time: moment("12:16 PM", ["h:mm A"]).format("HH:mm:ss"),
    Movie_ID: 1,
    Theatre_ID: 1,
  },
  {
    Show_date: moment("2023-03-19", "YYYY-MM-DD").toDate(),
    Show_Time: moment("08:20 PM", ["h:mm A"]).format("HH:mm:ss"),
    Movie_ID: 1,
    Theatre_ID: 1,
  },
  {
    Show_date: moment("2023-03-20", "YYYY-MM-DD").toDate(),
    Show_Time: moment("04:10 PM", ["h:mm A"]).format("HH:mm:ss"),
    Movie_ID: 1,
    Theatre_ID: 1,
  },
  {
    Show_date: moment("2023-04-25", "YYYY-MM-DD").toDate(),
    Show_Time: moment("01:16 PM", ["h:mm A"]).format("HH:mm:ss"),
    Movie_ID: 2,
    Theatre_ID: 2,
  },
  {
    Show_date: moment("2023-03-19", "YYYY-MM-DD").toDate(),
    Show_Time: moment("12:16 PM", ["h:mm A"]).format("HH:mm:ss"),
    Movie_ID: 2,
    Theatre_ID: 2,
  },
  {
    Show_date: moment("2023-03-20", "YYYY-MM-DD").toDate(),
    Show_Time: moment("01:16 PM", ["h:mm A"]).format("HH:mm:ss"),
    Movie_ID: 2,
    Theatre_ID: 2,
  },
  {
    Show_date: moment("2023-04-25", "YYYY-MM-DD").toDate(),
    Show_Time: moment("08:20 PM", ["h:mm A"]).format("HH:mm:ss"),
    Movie_ID: 3,
    Theatre_ID: 3,
  },
  {
    Show_date: moment("2023-03-19", "YYYY-MM-DD").toDate(),
    Show_Time: moment("12:16 PM", ["h:mm A"]).format("HH:mm:ss"),
    Movie_ID: 3,
    Theatre_ID: 3,
  },
  {
    Show_date: moment("2023-03-20", "YYYY-MM-DD").toDate(),
    Show_Time: moment("08:20 PM", ["h:mm A"]).format("HH:mm:ss"),
    Movie_ID: 3,
    Theatre_ID: 3,
  },
];

// Bulk insert for ShowTable
async function bulkInsertShows() {
  try {
    const res = await ShowTable.bulkCreate(showList);
    console.log("Shows bulk inserted:", res);
  } catch (error) {
    console.error("Error bulk inserting shows:", error);
  }
}

// Call the function to bulk insert shows
bulkInsertShows();

// endpoints////
async function getShowsByDateAndTheatre(date, theatreID) {
  return await ShowTable.findAll({
    attributes: ["Show_date", "Show_Time"],
    include: [
      {
        model: Movie,
        attributes: ["Movie_name"],
      },
      {
        model: Theatre,
        attributes: ["Theatre_name"],
      },
    ],
    where: {
      Show_date: date,
      Theatre_ID: theatreID,
    },
  });
}

module.exports = {
  getShowsByDateAndTheatre,
};
