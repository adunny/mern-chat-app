import React, { useState } from "react";
import { Col, Card, Button, Modal, Container, Row } from "react-bootstrap";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";

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

  const [modal, setModal] = useState(false);

  return (
    <Col>
      <h3>Userpanel</h3>
      <Button onClick={() => setModal(true)}>Login/Signup</Button>
      {/* Login/Signup Modal */}
      <Modal size="lg" centered show={modal} onHide={() => setModal(false)}>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <h2>Sign in</h2>
                <Login />
              </Col>
              <Col>
                <h2>Create an Account</h2>
                <Signup />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      {/* Online Users */}
      {users.map((user) => (
        <Card>
          <Card.Title>{user.username}</Card.Title>
        </Card>
      ))}
    </Col>
  );
};

export default UserPanel;
