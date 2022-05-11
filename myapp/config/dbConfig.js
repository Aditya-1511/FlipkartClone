var userModel = require('../model/userModel');

// Connecting MongoDb
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/instagram").then(() => {
  console.log("\nMongoDb Connected Successfully");
});