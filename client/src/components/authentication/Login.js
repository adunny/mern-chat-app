import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Auth from "../../utils/auth";
import Api from "../../utils/api";

const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // TODO: better error handling/validation
    try {
      const { data } = await Api.postLogin(formState);
      Auth.login(data.token);
      setFormState({ username: "", password: "" });
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
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="*********"
          onChange={handleInputChange}
          value={formState.password}
        />
      </Form.Group>
      <Button className="btn-secondary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
