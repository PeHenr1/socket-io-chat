import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const UserProfile = ({ nickname, onLogout }) => {
  const initials = nickname
    ? nickname
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("")
    : "";

  return (
    <Col className="border-end d-flex flex-column">
      <Card className="mb-5 shadow-sm w-100">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs="auto">
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
                {initials}
              </div>
            </Col>
            <Col>
              <strong>{nickname}</strong>
            </Col>
            <Col xs="auto">
              <Button variant="outline-danger" size="sm" onClick={onLogout}>
                Log Out
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>

  );
};

export default UserProfile;
