import React, { useState } from "react";
import { Col, Card, Form, InputGroup, Button } from "react-bootstrap";

const ChatPanel = () => {
  const messages = [
    {
      username: "guy",
      messageText: "yo",
    },
    {
      username: "dude",
      messageText: "sup",
    },
    {
      username: "person",
      messageText: "fk u",
    },
    {
      username: "idiotmoron",
      messageText: "ahasdfgasdfag",
    },
    {
      username: "dumbass",
      messageText: "aaaaaaaaaaaaaaaa",
    },
  ];

  const [form, setForm] = useState("");

  return (
    <Col>
      <h3>Chat Panel</h3>
      {messages.map((msg) => (
        <Card>
          <Card.Header>{msg.username}:</Card.Header>
          <Card.Body>
            <Card.Text>{msg.messageText}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <Form>
        <InputGroup>
          <Form.Control
            as="textarea"
            rows={3}
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
          <Button>Send</Button>
        </InputGroup>
      </Form>
    </Col>
  );
};

export default ChatPanel;
