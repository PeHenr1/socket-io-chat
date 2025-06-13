import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(text);
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          placeholder="Digite sua mensagem..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Enviar
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;
