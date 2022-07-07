import React, { useState, useEffect } from "react";
import { Col, Card, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import Api from "../utils/api";
import Auth from "../utils/auth";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState("");

  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await Api.getMessages();
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, []);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    // TODO: change alert to a modal, maybe make a state variable for user info?
    if (loggedIn) {
      const token = Auth.getToken();
      const { username } = Auth.getUserInfo();
      try {
        const response = await Api.postMessage(username, form, token);
        if (response.statusText !== "OK") {
          throw new Error("Something went wrong..");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      // possibly open login/signup modal (useContext) instead alerting an error message?
      alert("You must be logged in to send a message");
    }
  };

  return (
    <Col>
      <h3>Chat Panel</h3>
      {loading && <Spinner animation="border" role="status" />}
      {messages.map((msg) => (
        <Card key={msg._id}>
          <Card.Header>{msg.username}:</Card.Header>
          <Card.Body>
            <Card.Text>{msg.messageText}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Form onSubmit={handleMessageSubmit}>
        <InputGroup>
          <Form.Control
            as="textarea"
            rows={3}
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
          <Button type="submit">Send</Button>
        </InputGroup>
      </Form>
    </Col>
  );
};

export default ChatPanel;
