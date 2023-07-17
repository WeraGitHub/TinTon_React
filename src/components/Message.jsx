import React from "react";
import "./Message.css";

const Message = ({message}) => (
  <div className="message">
    <p>{message}</p>
  </div> 
);

export default Message;