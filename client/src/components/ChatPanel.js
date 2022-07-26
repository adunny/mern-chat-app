import React, { useState, useEffect, useRef } from "react";
import { Col, Card, Form, InputGroup, Button, Spinner } from "react-bootstrap";
import Api from "../utils/api";
import Auth from "../utils/auth";

const ChatPanel = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [errMsg, setErrMsg] = useState({ show: false, msg: "" });

  const messagesEndRef = useRef(null);

  const loggedIn = Auth.loggedIn();

  // scroll chat down on new message recieved
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  // receive new msgs thru socket
  useEffect(() => {
    socket.on("received_message", (newMsg) => {
      setMessages([...messages, newMsg]);
    });
  });

  // get messages on page load
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

  const handleChange = (e) => {
    const { value } = e.target;

    if (value.length <= 180) {
      setForm(value);
      setCharCount(value.length);
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setErrMsg({ show: false, msg: "" });
    if (loggedIn) {
      const token = Auth.getToken();
      const { username } = Auth.getUserInfo();
      try {
        const response = await Api.postMessage(username, form.trim(), token);
        socket.emit("new_message", response.data);
        setMessages([...messages, response.data]);
        setForm("");
        setCharCount(0);
      } catch (err) {
        const errData = err.response.data;
        setErrMsg({ show: true, msg: errData.message });
      }
    } else {
      alert("You must be logged in to send a message");
    }
  };

  return (
    <Col sm={12} md={6}>
      <h3>Chat Panel</h3>
      {loading && <Spinner animation="border" role="status" />}
      <div className="chatbox">
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
            maxLength={180}
            value={form}
            onChange={handleChange}
          />
          <Button className="btn-secondary" type="submit">
            Send
          </Button>
        </InputGroup>
      </Form>
      <p className={charCount === 180 ? "text-danger" : "text-dark"}>
        {errMsg.show && (
          <span className="text-danger">
            {errMsg.msg}
            <br />
          </span>
        )}
        {charCount}/180
      </p>
    </Col>
  );
};

export default ChatPanel;
