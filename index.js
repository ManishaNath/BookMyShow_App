const express = require("express");
const app = express();
require("./src/associations"); // Import the associations file

// redis- caching:
const redis = require("redis");

// Middleware to check Redis cache before querying the database
app.use(async (req, res, next) => {
  const client = redis.createClient(); // Create Redis client inside the middleware
  const key = req.originalUrl || req.url;
  const cachedData = await getFromCache(key);

  if (cachedData) {
    res.json(JSON.parse(cachedData));
  } else {
    res.sendResponse = res.json;
    res.json = (body) => {
      setToCache(client, key, body);
      res.sendResponse(body);
      // Close the Redis client after the response is sent
      client.quit();
    };

    next();
  }
});

// Function to get/Read data from Redis cache
const getFromCache = (client, key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

// Function to set data to Redis cache
const setToCache = (client, key, data) => {
  client.set(key, JSON.stringify(data));
};

// path for routes
const theatreRoutes = require("./src/routes/theatreRoutes");
const movieRoutes = require("./src/routes/movieRoutes");
const showtimeRoutes = require("./src/routes/showtimeRoutes");
const screenRoutes = require("./src/routes/screenRoutes");
const seatRoutes = require("./src/routes/seatRoutes");
const ticketRoutes = require("./src/routes/ticketRoutes");
const userRoutes = require("./src/routes/userRoutes");
const cityRoutes = require("./src/routes/cityRoutes");

// to use
app.use("/api/theatre", theatreRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/showtime", showtimeRoutes);
app.use("/api/screen", screenRoutes);
app.use("/api/seat", seatRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/user", userRoutes);
app.use("/api/city", cityRoutes);
const sequelize = require("./src/dbConnection"); // database connection file

// Connect to the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced successfully");
});

app.use(express.json());
const path = require("path");

/* Sample Endpoint */
app.get("/api", (req, res) => {
  res.send("Welcome to BookMyShow Application");
});

async function addForeignKeyConstraint() {
  try {
    await sequelize.query(
      "ALTER TABLE `Screens` ADD FOREIGN KEY (`TheatreTheatreID`) REFERENCES `Theatres` (`Theatre_ID`) ON DELETE SET NULL ON UPDATE CASCADE;"
    );
    console.log("Foreign key added successfully");
  } catch (error) {
    if (
      error.name === "SequelizeDatabaseError" &&
      error.parent &&
      error.parent.code === "ER_LOCK_DEADLOCK"
    ) {
      // Retry the operation after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
      await addForeignKeyConstraint();
    } else {
      throw error;
    }
  }
}

// Call the function
addForeignKeyConstraint();

/** Start the Server */
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("some error encountered");
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

//npm install sequelize - orm
//npm install mysql2
// npm install express
//npm install redis - Caching

// 1. Define models
// 2. Define associations
// 3. Create the necessary APIs to fetch theatre, dates, and movies
