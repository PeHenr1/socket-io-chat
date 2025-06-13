import React from "react";
import { Card, ListGroup, Button, Row, Col, Image } from "react-bootstrap";

const UserList = ({ users, currentUser, onLogout }) => {
  const avatar = (
    <div
      style={{
        backgroundColor: "#007bff",
        color: "white",
        borderRadius: "50%",
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "1.2rem",
        userSelect: "none",
      }}
    >
      {currentUser.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <Card className="mt-2 shadow">
      <Card.Header>Usuários Online</Card.Header>

      <Card.Body>
        <Row className="align-items-center">
          <Col xs="auto">{avatar}</Col>
          <Col>
            <strong>{currentUser}</strong>
          </Col>
          <Col xs="auto">
            <Button variant="outline-danger" size="sm" onClick={onLogout}>
              Log Out
            </Button>
          </Col>
        </Row>
      </Card.Body>

      <ListGroup variant="flush">
        {users.map((user, idx) => (
          <ListGroup.Item key={idx}>{user}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default UserList;
