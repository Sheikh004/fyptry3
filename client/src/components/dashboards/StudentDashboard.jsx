import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import NavBar from "../NavBar";
const StudentDashboard = () => {
  return (
    <div style={{ backgroundColor: "#0490db", height: "847px" }}>
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
                backgroundColor: "#052f72",
                color: "white",
                marginTop: "100px",
                borderRadius: "15px",
                boxShadow: "8px 8px 10px rgba(0, 0, 0, 0.25)", // Add box shadow
                padding: "20px",
              }}
            >
              <h3 style={{ marginTop: "15px", textAlign: "center" }}>
                Notice Board
              </h3>
              <p
                style={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "0px",
                  paddingLeft: "8px",
                  height: "200px",
                  overflow: "auto",
                  borderRadius: "15px",
                }}
              >
                You have{" "}
                <span style={{ color: "red", fontWeight: "bold" }}> 26 </span>{" "}
                announcements
                <br /> hi
                <br />
                hi
                <br />
                You have{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  26{" "}
                </span>{" "}
                announcements
                <br /> hi
                <br />
                hi <br /> hi <br />
                hi <br />
                hi <br />
                hi <br />
                hi hi
              </p>
            </Col>

            <Col
              style={{
                height: "350px",
                backgroundColor: "#052f72",
                color: "white",
                marginTop: "100px",
                borderRadius: "15px",
                boxShadow: "8px 8px 10px rgba(0, 0, 0, 0.25)", // Add box shadow
                padding: "20px",
                marginLeft: "30px",
              }}
            >
              <h3 style={{ marginTop: "12px", textAlign: "center" }}>
                Supervisor
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ul
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    height: "30px",
                    borderRadius: "5px",
                    width: "500px",
                    fontSize: "20px",
                  }}
                >
                  <li>Miss Mahwish Waqas</li>
                </ul>
              </div>

              <h3 style={{ marginTop: "12px", textAlign: "center" }}>
                Team Members
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ul
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "5px",
                    width: "500px",
                    fontSize: "20px",
                  }}
                >
                  <li>Muhammad Irfan</li>
                  <li>Areeb Zaman</li>
                  <li>Abdul Raheem</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default StudentDashboard;
