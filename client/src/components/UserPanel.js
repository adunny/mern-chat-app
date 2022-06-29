import React from "react";
import { Col, Card } from "react-bootstrap";

const UserPanel = () => {
  const users = [
    {
      username: "guy",
    },
    {
      username: "dude",
    },
    {
      username: "person",
    },
    {
      username: "idiotmoron",
    },
    {
      username: "dumbass",
    },
  ];

  return (
    <Col>
      <h3>Userpanel</h3>
      {users.map((user) => (
        <Card>
          <Card.Title>{user.username}</Card.Title>
        </Card>
      ))}
    </Col>
  );
};

export default UserPanel;
