require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const errorMiddleware = require("./utils/errorMiddleware");
const rootSocket = require("./controllers/socket/rootSocket");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(cors());
app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// websocket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
rootSocket(io);

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
