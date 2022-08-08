import React from "react";
import UserPanel from "../components/UserPanel";
import ChatPanel from "../components/ChatPanel";
import { Row } from "react-bootstrap";
import io from "socket.io-client";

const Home = () => {
  const ENDPOINT =
    "http://localhost:3001" || "https://globalchat0.herokuapp.com/";
  const socket = io.connect(ENDPOINT);
  return (
    <Row>
      <UserPanel socket={socket} />
      <ChatPanel socket={socket} />
    </Row>
  );
};

export default Home;
