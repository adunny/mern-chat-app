import React, { useState, useEffect } from "react";
import { Col, Card, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import Api from "../utils/api";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState("");

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
