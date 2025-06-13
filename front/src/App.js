import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Card,
} from "react-bootstrap";
import UserProfile from "./components/UserProfile";

const socket = io("http://localhost:3001", { autoConnect: false });
const TIMEOUT = 60000; // 1 minuto de timeout

function App() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  const logoutTimer = useRef(null);

  const startLogoutTimer = () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(() => {
      socket.emit("timeout-logout");
      socket.disconnect();
      setLogged(false);
      setUsers([]);
      setChat([]);
    }, TIMEOUT);
  };

  const resetLogoutTimer = () => {
    startLogoutTimer();
  };

  const handleLogout = () => {
    socket.emit("logout");
    socket.disconnect();
    setLogged(false);
    setUsers([]);
    setChat([]);
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
  };

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      console.log("New message:", msg);
      setChat((prev) => [...prev, msg]);
      resetLogoutTimer();
    });

    socket.on("user-list", (userList) => {
      console.log("Users:", userList);
      const usersArray = Array.isArray(userList)
        ? userList
        : Object.values(userList);
      setUsers(usersArray);
    });

    socket.on("timeout-logout", () => {
      alert("Disconnected for inactivity");
      setLogged(false);
      setUsers([]);
      setChat([]);
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket desconectado:", reason);
      setLogged(false);
      setUsers([]);
      setChat([]);
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    });

    return () => {
      socket.off("receive-message");
      socket.off("user-list");
      socket.off("timeout-logout");
      socket.off("disconnect");
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, []);

  const handleLogin = () => {
    if (!nickname || !password) return alert("Please put something in the inputs");
    socket.connect();
    socket.emit("login", { nickname, password }, (response) => {
      if (response.success) {
        setLogged(true);
        setUsers(response.users);
        startLogoutTimer();
      } else {
        alert(response.message);
      }
    });
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send-message", message);
      setMessage("");
      resetLogoutTimer();
    }
  };

  if (!logged) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Card style={{ width: "22rem" }} className="p-4">
          <h4 className="mb-3 text-center">Login</h4>
          <Form>
            <Form.Group>
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button className="mt-3 w-100" onClick={handleLogin}>
              Enter
            </Button>
          </Form>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="vh-100 p-3">
      <Row className="h-100">

        <Col className="border-end d-flex flex-column">
          <div className="mb-3">
            <UserProfile
              nickname={nickname}
              onLogout={handleLogout}
            />
          </div>
          <div className="flex-grow-1 d-flex flex-column">
            <h5>Online Users</h5>
            <ListGroup className="flex-grow-1 overflow-auto" style={{ maxHeight: "100%" }}>
              {users.map((u, i) => (
                <ListGroup.Item key={i}>{u}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
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
    </Container>

  );
}

export default App;
