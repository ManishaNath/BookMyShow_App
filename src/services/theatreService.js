// src/services/theatreService.js
const Theatre = require("../models/theatreModel");
const ShowTable = require("../models/showtimeModel");
const Movie = require("../models/movieModel");
const { Op } = require("sequelize");

// Inserting into DB - Bulk insert
// Sample data for Theatres
const theatreList = [
  { Theatre_name: "PVR_NEXUS", City_ID: "c76" },
  { Theatre_name: "PVR_NEXUS", City_ID: "c89" },
  { Theatre_name: "PVR_NEXUS", City_ID: "c45" },
  { Theatre_name: "PVR_NEXUS", City_ID: "c32" },
];

// Bulk insert for Theatres
async function bulkInsertTheatres() {
  try {
    const res = await Theatre.bulkCreate(theatreList);
    console.log("Theatres bulk inserted:", res);
  } catch (error) {
    console.error("Error bulk inserting theatres:", error);
  }
}

// Call the function to bulk insert theatres
bulkInsertTheatres();

//////// endpoints////////
//As a user, I can select any theatre in the city.
//On selecting the theatre, I should be able to see the dates of next 7 days.

async function getAllTheatres() {
  return await Theatre.findAll();
}

async function getDatesForTheatre(theatreID) {
  const dates = await ShowTable.findAll({
    attributes: [
      [sequelize.fn("DISTINCT", sequelize.col("Show_date")), "Show_date"],
    ],
    where: {
      Theatre_ID: theatreID,
      Show_date: {
        [Op.gte]: new Date(),
      },
    },
    order: [["Show_date", "ASC"]],
    limit: 7,
  });
  return dates.map((date) => date.Show_date.toISOString().split("T")[0]);
}

async function getMoviesForDate(theatreID, date) {
  const movies = await Movie.findAll({
    attributes: [
      "Movie_name",
      "Total_time",
      "Genres",
      "Language",
      "Movie_ratings",
    ],
    include: [
      {
        model: ShowTable,
        attributes: ["Show_date", "Show_Time"],
        where: {
          Theatre_ID: theatreID,
          Show_date: date,
        },
      },
    ],
  });
  return movies;
}

module.exports = {
  getAllTheatres,
  getDatesForTheatre,
  getMoviesForDate,
};

// INDEXING:

//CREATE INDEX idx_theatre_id ON Theatre (Theatre_ID);

//CREATE INDEX idx_movie_id ON Movie (Movie_ID);

//CREATE INDEX idx_theatre_show_date ON ShowTable (Theatre_ID, Show_date);
