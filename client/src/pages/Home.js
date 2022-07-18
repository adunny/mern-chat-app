import React from "react";
import UserPanel from "../components/UserPanel";
import ChatPanel from "../components/ChatPanel";
import { Row } from "react-bootstrap";
import io from "socket.io-client";

const Home = () => {
  const socket = io.connect("http://localhost:3001");
  return (
    <Row>
      <UserPanel socket={socket} />
      <ChatPanel socket={socket} />
    </Row>
  );
};

export default Home;
