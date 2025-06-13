import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Row,
  Col,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";

function Chat({ nickname, password, onLogout }) {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");

    newSocket.emit("login", { nickname, password }, (response) => {
      if (!response.success) {
        alert("Login no chat falhou, recarregando...");
        window.location.reload();
      } else {
        setUsers(response.users);
      }
    });

    newSocket.on("receive-message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    newSocket.on("user-list", (userList) => {
      setUsers(userList);
    });

    newSocket.on("timeout-logout", (msg) => {
      alert(msg);
      window.location.reload();
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      window.location.reload();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [nickname, password]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("send-message", message);
      setMessage("");
    }
  };

  const handleLogoutClick = () => {
    if (socket) {
      socket.disconnect();
    }
    onLogout();
  };

  return (
    <Row className="h-100">
      <Col md={3} className="border-end">
        <h5>Online Users</h5>
        <ListGroup>
          {users.map((u, i) => (
            <ListGroup.Item key={i}>{u}</ListGroup.Item>
          ))}
        </ListGroup>
        <Button variant="danger" className="mt-3 w-100" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Col>
      <Col md={9} className="d-flex flex-column">
        <div className="flex-grow-1 border p-3 overflow-auto bg-light rounded">
          {chat.map((msg, i) => (
            <div key={i}>
              <strong>{msg.from}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-2 d-flex">
          <Form.Control
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} className="ms-2">
            Send
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default Chat;
