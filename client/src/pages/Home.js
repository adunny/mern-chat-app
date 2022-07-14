import React from "react";
import ChatPanel from "../components/ChatPanel";
import UserPanel from "../components/UserPanel";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import Auth from "../utils/auth";

import { Row, Container, Col, Card, Accordion } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-5 pt-5">
      {!Auth.loggedIn() ? (
        <>
          <Row>
            <Col className="my-3">
              <Card className="bg-secondary">
                <Card.Body className="text-center text-white">
                  <Card.Title>Welcome</Card.Title>
                  <Card.Text>lorem ipsum fuck u</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="text-white">
              <Accordion>
                <Accordion.Item eventKey="0" className="bg-secondary">
                  <Accordion.Header>
                    <h5>Login</h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Login />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col className="text-white">
              <Accordion>
                <Accordion.Item eventKey="0" className="bg-secondary">
                  <Accordion.Header>
                    <h5>Signup</h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Signup />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <UserPanel />
          <ChatPanel />
        </Row>
      )}
    </Container>
  );
};

export default Home;
