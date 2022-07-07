const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./controllers");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = process.env.port || 3001;

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
io.on("connection", (socket) => {
  console.log(`User ID connected: ${socket.id}`);

  socket.on("join_chatroom", (room) => {
    socket.join("public_chat");
    console.log(`A user has joined the room: ${room}`);
  });

  socket.on("new_message", (message) => {
    console.log(message);

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
