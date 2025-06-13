import React from "react";

const MessageList = ({ messages }) => (
  <>
    {messages.map((msg, idx) => (
      <div key={idx}>
        <strong>{msg.nickname}: </strong>
        <span>{msg.text}</span>
      </div>
    ))}
  </>
);

export default MessageList;
