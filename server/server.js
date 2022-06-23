const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const routes = require("./controllers");

const app = express();
const server = http.createServer(app);
const PORT = process.env.port || 3001;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

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
