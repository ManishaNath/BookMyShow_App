// src/services/userService.js
const User = require("../models/userModel");

// Inserting into DB - Bulk insert for userTable
const userList = [
  { User_ID: 9876, Username: "ANU", Show_ID: 1 },
  { User_ID: 8765, Username: "BINU", Show_ID: 2 },
  { User_ID: 7654, Username: "SINU", Show_ID: 3 },
  { User_ID: 6543, Username: "VINU", Show_ID: 4 },
];

async function bulkInsertUsers() {
  try {
    const res = await User.bulkCreate(userList);
    console.log("Users bulk inserted:", res);
  } catch (error) {
    console.error("Error bulk inserting users:", error);
  }
}

// Call the function to bulk insert users
bulkInsertUsers();

async function getAllUsers() {
  return await Theatre.findAll();
}

module.exports = {
  getAllUsers,
};
