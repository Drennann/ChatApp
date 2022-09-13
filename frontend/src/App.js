import './App.css';
import io from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io();


function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessages([...messages, {
      from: "Me",
      body: message
    }])
    setMessage("");
  }

  useEffect(() => {
    socket.on("message", messageData => setMessages([...messages, messageData]));
  },[messages])

  return (
    <div className="App" onSubmit={handleSubmit}>
      <form>
        <h1>Chat App</h1>
        <ul>
          {messages.map((m, index) => {
            return (<li key={index} className={m.from === "Me"? "Right" : "Left"}>
              {`${m.from}: ${m.body}`}
            </li>)
          })}
        </ul>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
      </form>
    </div>
  );
}

export default App;
