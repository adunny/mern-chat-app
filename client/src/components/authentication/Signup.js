import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Auth from "../../utils/auth";
import Api from "../../utils/api";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Api.postUser(formState);
      Auth.login(data.token);
      setFormState({ username: "", email: "", password: "" });
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
          value={formState.username}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={formState.email}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="*********"
          name="password"
          onChange={handleInputChange}
          value={formState.password}
        />
      </Form.Group>
      <Button type="submit">Signup</Button>
    </Form>
  );
};

export default Signup;
