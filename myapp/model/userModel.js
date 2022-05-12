// Importing mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Export user module
const User = mongoose.model("User", UserSchema);
module.exports = User;
