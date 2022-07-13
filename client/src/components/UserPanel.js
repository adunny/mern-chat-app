import React, { useState, useEffect } from "react";
import { Col, Card, Button, Modal, Container, Row } from "react-bootstrap";
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import Auth from "../utils/auth";
import { socket } from "../utils/socketConnection";

const UserPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (Auth.loggedIn()) {
      const { data } = Auth.getUserInfo();
      socket.emit("user_connected", data.username);
    }
  }, []);

  useEffect(() => {
    socket.on("online_users", (onlineUsers) => {
      setUsers(onlineUsers);
    });
  });

  const logOutHandler = () => {
    const { data } = Auth.getUserInfo();
    socket.emit("user_disconnected", data.username);
    socket.on("user_disconnected", (onlineUsers) => {
      setUsers(onlineUsers);
    });
    Auth.logout();
  };

  const [modal, setModal] = useState(false);

  return (
    <Col>
      <h3>Userpanel</h3>
      {Auth.loggedIn() ? (
        <Button onClick={logOutHandler}>Logout</Button>
      ) : (
        <Button onClick={() => setModal(true)}>Login/Signup</Button>
      )}

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
      {/* User List */}
      <h4>Online users</h4>
      {users.length ? (
        users.map((x) => (
          <Card key={x.id}>
            <Card.Title>{x.user}</Card.Title>
          </Card>
        ))
      ) : (
        <div>No users online</div>
      )}
    </Col>
  );
};

export default UserPanel;
