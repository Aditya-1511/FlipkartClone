const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myChatAppdb").then(() => {
  console.log("MongoDb connected successfully");
});

const msgSchema = new mongoose.Schema({
  msg: {
    type: String,
  },
  userName: {
    type: String,
  },
  socketId: [String],
  roomNum: {
    type: Number,
  },
});
const Msg = mongoose.model("msg", msgSchema);
module.exports = Msg;
