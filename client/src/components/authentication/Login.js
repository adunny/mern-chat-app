import React from "react";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  return (
    <Form>
      <Form.Group controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="*********" />
      </Form.Group>
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default Login;
