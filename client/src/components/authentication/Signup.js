import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Auth from "../../utils/auth";
import Api from "../../utils/api";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState({
    usernameErr: false,
    emailErr: false,
    passwordErr: false,
  });

  const [errorMsg, setErrorMsg] = useState({
    usernameMsg: "",
    emailMsg: "",
    passwordMsg: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // clear error messages
    setShowError({ usernameErr: false, emailErr: false, passwordErr: false });
    try {
      // create user in db and sign token
      const { data } = await Api.postUser(formState);
      Auth.login(data.token);
      setFormState({ username: "", email: "", password: "" });
    } catch (err) {
      const errData = err.response.data;

      // error messages
      const messages = {
        username: errData.message.find((str) => str.includes("username")),
        email: errData.message.find((str) => str.includes("email")),
        password: errData.message.find((str) => str.includes("password")),
      };

      // set and show error messages on each individual field
      if (errData.path.includes("username")) {
        setShowError((showError) => ({ ...showError, usernameErr: true }));
        setErrorMsg((errorMsg) => ({
          ...errorMsg,
          usernameMsg: messages.username,
        }));
      }
      if (errData.path.includes("email")) {
        setShowError((showError) => ({ ...showError, emailErr: true }));
        setErrorMsg((errorMsg) => ({ ...errorMsg, emailMsg: messages.email }));
      }
      if (errData.path.includes("password")) {
        setShowError((showError) => ({ ...showError, passwordErr: true }));
        setErrorMsg((errorMsg) => ({
          ...errorMsg,
          passwordMsg: messages.password,
        }));
      }
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
        {showError.usernameErr && (
          <p className="text-danger fst-italic">{errorMsg.usernameMsg}</p>
        )}
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
        {showError.emailErr && (
          <p className="text-danger fst-italic">{errorMsg.emailMsg}</p>
        )}
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
        {showError.passwordErr && (
          <p className="text-danger fst-italic">{errorMsg.passwordMsg}</p>
        )}
      </Form.Group>
      <Button className="btn-secondary" type="submit">
        Signup
      </Button>
    </Form>
  );
};

export default Signup;
