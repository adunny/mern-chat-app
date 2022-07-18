import React from "react";
import Home from "./pages/Home";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Auth from "./utils/auth";

import { Row, Container, Col, Card, Accordion } from "react-bootstrap";

function App() {
  return (
    <Container className="mt-5 pt-5">
      {!Auth.loggedIn() ? (
        <>
          <Row>
            <Col className="my-3 mb-5 px-5">
              <Card className="card-bg">
                <Card.Body className="text-center">
                  <Card.Title>Welcome</Card.Title>
                  <Card.Text>lorem ipsum fuck u</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6} className="mb-5">
              <Accordion>
                <Accordion.Item eventKey="0" className="card-bg">
                  <Accordion.Header>
                    <h5>Login</h5>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Login />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col sm={12} md={6}>
              <Accordion>
                <Accordion.Item eventKey="0" className="card-bg">
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
        <Home />
      )}
    </Container>
  );
}

export default App;
