import React, { useState, useEffect } from "react";
import { Col, Card, Button, ListGroup } from "react-bootstrap";
import Auth from "../utils/auth";

const UserPanel = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (Auth.loggedIn()) {
      const { data } = Auth.getUserInfo();
      socket.emit("user_connected", data.username);
    }
  }, [socket]);

  useEffect(() => {
    socket.on("online_users", (onlineUsers) => {
      setUsers(onlineUsers);
    });
  });

  const logOutHandler = () => {
    const { data } = Auth.getUserInfo();
    socket.emit("logout", data.username);
    Auth.logout();
  };

  return (
    <Col sm={12} md={6}>
      {/* User List */}
      <h3>Online Users</h3>
      {Auth.loggedIn() && (
        <div className="pb-3">
          <Button className="btn-secondary" onClick={logOutHandler}>
            Logout
          </Button>
        </div>
      )}

      <Card className="card-bg">
        <ListGroup variant="flush">
          {users.length ? (
            users.map((x) => (
              <ListGroup.Item className="card-bg" key={x.id}>
                {x.user}
              </ListGroup.Item>
            ))
          ) : (
            <div>No users online</div>
          )}
        </ListGroup>
      </Card>
    </Col>
  );
};

export default UserPanel;
