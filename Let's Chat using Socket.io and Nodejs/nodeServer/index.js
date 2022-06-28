const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

const mongoose = require("mongoose");
const Msg = require("../model/messages");

const users = {};
// console.log(users);

io.on("connection", (socket) => {
  // console.log("Socket is connected");
  socket.on("new-user-joined", (user) => {
    // console.log("New User", user);

    users[socket.id] = user;
    // console.log(users, "users");
    socket.broadcast.emit("user-joined", user);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
