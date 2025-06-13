import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Card, Form, Button } from "react-bootstrap";

function Login({ setLogged, setNickname, setPassword, nickname, password }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      window.location.reload();
    });

    newSocket.on("timeout-logout", (msg) => {
      alert(msg);
      window.location.reload();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleLogin = () => {
    if (!nickname || !password) return;
    socket.emit("login", { nickname, password }, (response) => {
      if (response.success) {
        setLogged(true);
        setNickname(nickname);
        setPassword(password);
      } else {
        alert(response.message);
      }
    });
  };

  return (
    <Card style={{ width: "22rem" }} className="p-4 mx-auto mt-5">
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
        <Button className="mt-3 w-100" onClick={handleLogin} disabled={!socket}>
          Enter
        </Button>
      </Form>
    </Card>
  );
}

export default Login;
