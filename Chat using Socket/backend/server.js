const express = require('express');
const { Socket } = require('socket.io');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors : {
        origin : "*",
    }
});

io.on("connection", (socket)=>{
    console.log("Hello", socket);
    console.log("Socket is active to be connected");

    socket.on("chat", (payload)=>{
        console.log(payload);
        io.emit("chat", payload);
    });
});


// app.listen(5000,()=> console.log("Server is active..."));

server.listen(5000, () =>{
    console.log("Server is running at port 5000");
});