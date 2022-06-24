const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myChatAppdb").then(() => {
  console.log("MongoDb connected successfully");
});

const msgSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  socketId: [String],
  roomNum: {
    type: Number,
  },
  fileLocation: {
    type: String,
  },
});
const Msg = mongoose.model("msg", msgSchema);
module.exports = Msg;
