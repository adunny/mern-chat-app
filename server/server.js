const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./controllers");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.port || 3001;
const { checkUserArray } = require("./utils/checkUserArray");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(cors());

// websocket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// TODO: move this stuff to a seperate file possibly
const onlineUsers = [];
io.on("connection", (socket) => {
  socket.emit("online_users", onlineUsers);
  socket.join("public_chat");

  socket.on("user_connected", (user) => {
    const userExists = checkUserArray(user, onlineUsers);
    !userExists && onlineUsers.push({ user, id: socket.id });

    socket.in("public_chat").emit("online_users", onlineUsers);
    socket.emit("online_users", onlineUsers);
    console.log(`${user} is now online.`);
  });

  socket.on("user_disconnected", (user) => {
    const userExists = checkUserArray(user, onlineUsers);
    // finds the user that disconnected and removes them from the array
    userExists &&
      onlineUsers.splice(
        onlineUsers.indexOf((obj) => obj.name === user),
        1
      );
    socket.emit("online_users", onlineUsers);
    socket.in("public_chat").emit("online_users", onlineUsers);
    socket.emit("user_disconnected", onlineUsers);
    console.log(`${user} is now offline.`);
  });

  socket.on("new_message", (message) => {
    socket.in("public_chat").emit("received_message", message);
  });
});

// mongodb connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/chatapp"
);
const db = mongoose.connection;

db.once("open", () => {
  server.listen(PORT, () => {
    console.log("Server Live: http://localhost:3001");
  });
});
