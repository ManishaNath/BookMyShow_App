// src/services/movieService.js
const Movie = require("../models/movieModel");

// Inserting into DB - Bulk insert
// Sample data for Movies
const movieList = [
  {
    Movie_name: "DASARA",
    Total_time: "01:30",
    Genres: "CRIME",
    Language: "HINDI",
    Movie_ratings: "U/A",
  },
  {
    Movie_name: "KKBKKJ",
    Total_time: "02:30",
    Genres: "DRAMA",
    Language: "HINDI",
    Movie_ratings: "U",
  },
  {
    Movie_name: "TJMM",
    Total_time: "02:30",
    Genres: "SCIENTIFIC",
    Language: "HINDI",
    Movie_ratings: "U/A",
  },
  {
    Movie_name: "AVATAR",
    Total_time: "02:30",
    Genres: "DRAMA",
    Language: "ENGLISH",
    Movie_ratings: "S",
  },
];

// Bulk insert for Movies
async function bulkInsertMovies() {
  try {
    const res = await Movie.bulkCreate(movieList);
    console.log("Movies bulk inserted:", res);
  } catch (error) {
    console.error("Error bulk inserting movies:", error);
  }
}

// Call the function to bulk insert movies
bulkInsertMovies();

//endpoints
async function getShowsByMovie(movieID) {
  try {
    return await Movie.findAll({
      attributes: [
        "Movie_name",
        "Total_time",
        "Genres",
        "Language",
        "Movie_ratings",
      ],
      where: {
        Movie_ID: movieID,
      },
    });
  } catch (error) {
    console.error("Error in getShowsByMovie service:", error);
    throw error;
  }
}

module.exports = {
  getShowsByMovie,
};
