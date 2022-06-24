import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3005");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState("");
  const [user, setUser] = useState("");
  const [file, setFile] = useState("");

  const userName = () => {
    socket.emit("add_user", { user });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room, user, file });
  };

  const sendFile = () => {
    socket.emit("send_file", { file });
  };

  //listening broadcast message
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data, "......................................");
      setMessageReceived(data);
    });
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Enter your Name"
        onChange={(event) => {
          setUser(event.target.value);
        }}
      />{" "}
      <button onClick={userName}>Add User</button> <br /> <br />
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />{" "}
      <button onClick={joinRoom}>Join Room</button>
      <br />
      <br />
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />{" "}
      <button onClick={sendMessage}>Send Message</button>
      <br /> <br />
      <input
        type="file"
        onChange={(event) => {
          setFile(event.target.value);
        }}
      />{" "}
      <h1> Room : {room} </h1>
      <div className="liveChat">
        <div className="sentMessage">
          <h1>
            {user} : {message}{" "}
          </h1>
        </div>
        <div className="receivedMessage">
          {/* <h1>
            {" "}
            {messageReceived.user} : {messageReceived.message}{" "}
          </h1> */}
          {messageReceived.map((data, index) => {
            console.log(data, "kkkkkkkkkkkkkkkkkkkkkkkk");
            return (
              <p key={index}>
                <span>{data.user}</span> : {data.message}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
