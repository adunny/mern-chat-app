import React, { useState, useEffect } from "react";
import { Col, Card, Button } from "react-bootstrap";
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
    Auth.logout();
  };

  return (
    <Col>
      <h3>Userpanel</h3>
      {Auth.loggedIn() && <Button onClick={logOutHandler}>Logout</Button>}
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
