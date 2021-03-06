import React, { useState, useEffect, useRef } from "react";
import { Col, Card, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import Api from "../utils/api";
import Auth from "../utils/auth";

const ChatPanel = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState("");
  const messagesEndRef = useRef(null);

  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("received_message", (newMsg) => {
      setMessages([...messages, newMsg]);
    });
  });

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
        console.log(response.data);
        if (response.statusText !== "OK") {
          throw new Error("Something went wrong..");
        }
        socket.emit("new_message", response.data);
        setMessages([...messages, response.data]);
        setForm("");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("You must be logged in to send a message");
    }
  };

  return (
    <Col sm={12} md={6}>
      <h3>Chat Panel</h3>
      {loading && <Spinner animation="border" role="status" />}

      <div style={{ overflowY: "scroll", height: "400px" }}>
        {messages.map((msg) => (
          <Card className="card-bg" key={msg._id}>
            <Card.Header>{msg.username}:</Card.Header>
            <Card.Body>
              <Card.Text>{msg.messageText}</Card.Text>
            </Card.Body>
          </Card>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Form onSubmit={handleMessageSubmit}>
        <InputGroup>
          <Form.Control
            as="textarea"
            rows={3}
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
          <Button className="btn-secondary" type="submit">
            Send
          </Button>
        </InputGroup>
      </Form>
    </Col>
  );
};

export default ChatPanel;
