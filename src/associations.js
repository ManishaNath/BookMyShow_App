// associations.js
const Seat = require("./models/seatModel");
const Screen = require("./models/screenModel");
const ShowTable = require("./models/showtimeModel");
const Movie = require("./models/movieModel");
const Theatre = require("./models/theatreModel");
const User = require("./models/userModel");
const Ticket = require("./models/ticketModel");
const City = require("./models/cityModel");

// Seat:Screen (1:M)
Seat.belongsTo(Screen, { foreignKey: "Screen_ID" });
Screen.hasMany(Seat, { foreignKey: "Screen_ID" });

//Theatre : Show(3HR) – 1:M / Screen : Shows – 1: M
Screen.hasMany(ShowTable, { foreignKey: "Show_ID" });
ShowTable.belongsTo(Screen, { foreignKey: "Screen_ID" });

ShowTable.belongsTo(Movie, { foreignKey: "Movie_ID" });
ShowTable.belongsTo(Theatre, { foreignKey: "Theatre_ID" });

//User : Ticket -1:M
User.hasMany(Ticket, { foreignKey: "User_ID" });
Ticket.belongsTo(User, { foreignKey: "User_ID" });

Ticket.belongsTo(ShowTable, { foreignKey: "Show_ID" });

//City : Theatre – 1:M
City.hasMany(Theatre, { foreignKey: "City_ID" });
Theatre.belongsTo(City, { foreignKey: "City_ID" });

//Theatre : Screen – 1: M
Theatre.hasMany(Screen);
Screen.belongsTo(Theatre);

//Show : Movie – 1:1
ShowTable.hasOne(Movie);
Movie.belongsTo(ShowTable);

module.exports = {
  Seat,
  Screen,
  ShowTable,
  Movie,
  Theatre,
  User,
  Ticket,
  City,
};
