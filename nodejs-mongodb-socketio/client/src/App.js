/* eslint-disable jsx-a11y/alt-text */
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
  const [img, setImg] = useState("");
  // const [video, setVideo] = useState("");

  const userName = () => {
    socket.emit("add_user", { user });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room, user, file, img });
  };

  async function fileInput(e) {
    const file = e.target.files[0];
    setFile(file);
    const base64 = await convertBase64(file);
    // console.log(base64);
    setImg(base64);
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //listening broadcast message
  useEffect(() => {
    socket.on("receive_message", (data) => {
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
      <input type="file" onChange={fileInput}></input>
      <h1> Room : {room} </h1>
      <div className="liveChat">
        <div className="sentMessage">
          <h1>
            {user} : {message}{" "}
          </h1>
        </div>
        <div className="receivedMessage">
          <h1>
            {" "}
            {messageReceived.user} : {messageReceived.message}{" "}
          </h1>
          <img src={messageReceived.img} height={250} width={350}></img>
          {/* <video
            controls
            src={messageReceived.img}
            height={350}
            width={350}
          ></video> */}
          {/* <embed src={messageReceived.img} width="250" height="375"></embed> */}
        </div>
      </div>
    </div>
  );
}

export default App;
