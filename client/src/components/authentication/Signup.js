import React from "react";
import { Form, Button } from "react-bootstrap";

const Signup = () => {
  return (
    <Form>
      <Form.Group controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="*********" />
      </Form.Group>
      <Button type="submit">Signup</Button>
    </Form>
  );
};

export default Signup;
