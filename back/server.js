const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const users = new Map(); // socket.id -> nickname

io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  socket.on("login", ({ nickname, password }, callback) => {
    if (!nickname || !password) {
      return callback({ success: false, message: "Nickname and password are required" });
    }

    if ([...users.values()].includes(nickname)) {
      return callback({ success: false, message: "User already logged" });
    }

    users.set(socket.id, nickname);

    io.emit("user-list", [...users.values()]);
    callback({ success: true, users: [...users.values()] });

    console.log("User logged:", nickname);
  });

  socket.on("send-message", (text) => {
    const from = users.get(socket.id);
    if (!from) return; 
    const msg = { from, text };
    io.emit("receive-message", msg);
  });

  socket.on("logout", () => {
    users.delete(socket.id);
    io.emit("user-list", [...users.values()]);
    socket.disconnect();
  });

  socket.on("timeout-logout", () => {
    users.delete(socket.id);
    io.emit("user-list", [...users.values()]);
    socket.disconnect();
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit("user-list", [...users.values()]);
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running in 3001");
});
