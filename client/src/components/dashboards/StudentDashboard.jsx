import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import NavBar from "../NavBar";
const StudentDashboard = () => {
  return (
    <div style={{ backgroundColor: "#0B2B40", height: "847px" }}>
      <NavBar />
      <Container>
        <Row>
          <Col
            style={{ color: "white", textAlign: "center", marginTop: "100px" }}
          >
            <h1>Welcome to the E-FYP Portal</h1>
          </Col>
        </Row>
      </Container>

      <div>
        <Container>
          <Row>
            <Col
              style={{
                height: "350px",
                backgroundColor: "purple",
                color: "white",
                marginTop: "100px",
              }}
            >
              <h3 style={{ marginTop: "15px" }}>Notice Board</h3>
              <p
                style={{
                  backgroundColor: "white",
                  color: "black",
                  height: "30px",
                }}
              >
                You have 26 announcements
              </p>

              <h3>Supervisor</h3>
              <ul
                style={{
                  backgroundColor: "white",
                  color: "black",
                  height: "30px",
                }}
              >
                <li>Maam Mahwish Waqas</li>
              </ul>

              <h3>Team Members</h3>

              <ul style={{ backgroundColor: "white", color: "black" }}>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;
