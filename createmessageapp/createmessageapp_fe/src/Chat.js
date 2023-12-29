import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
import { React, useState } from "react";
import "./Chat.css";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Divij",
      timestamp: "Just now",
      received: true,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src="https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/405308691_3492221227775223_5410689100886905515_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHtScb6Spi-zxkVH9xrWvAZEgUcK_Ahg3kSBRwr8CGDeeD-yqvuErgSlw2mC3vWfOa1hxWwn7fXQ3c_siRPR8PH&_nc_ohc=pQJivxO-sbsAX9KR7gX&_nc_ht=scontent.fsgn5-10.fna&oh=00_AfBiaQ0nFWbKL-AVURrGXWDQlTgLsOGvExUUUjnYtgj8ow&oe=659186CC" />

        <div className="chat__headerInfo">
          <h3>Current chat</h3>
          <p>Last seen at 5:55 AM</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__receiver"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span
              className="chat__timestamp"
              style={{ height: "0%", width: "100%", marginRight: "-22px" }}
            >
              {message.timestamp}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
