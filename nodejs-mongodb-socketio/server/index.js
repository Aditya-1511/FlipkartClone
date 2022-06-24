const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const Msg = require("./models/messages");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const path = require("path");
app.use(express.static(path.resolve(__dirname, "uploads")));

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("add_user", (data) => {
    socket.emit(data);
  });

  //group chat
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    //broadcast message
    // console.log(data, "data");
    // console.log(socket.id,">>>>>>>>>>>>>>>>>>>>>>>>");
    const msg = data.message;
    const userName = data.user;
    const socketId = socket.id;
    const roomNum = data.room;
    const fileLocation = data.file;
    const message = new Msg({
      msg: msg,
      userName: userName,
      socketId: socketId,
      roomNum: roomNum,
      file: fileLocation,
    });
    message.save().then(() => {
      socket.to(data.room).emit("receive_message", data);
    });
  });
});

server.listen(3005, () => {
  console.log("Server is running at port 3005");
});
