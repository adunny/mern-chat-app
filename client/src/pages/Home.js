import React from "react";
import ChatPanel from "../components/ChatPanel";
import UserPanel from "../components/UserPanel";

import { Row } from "react-bootstrap";

const Home = () => {
  return (
    <Row>
      <UserPanel />
      <ChatPanel />
    </Row>
  );
};

export default Home;
