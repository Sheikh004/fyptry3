import React, { useContext } from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
import NavBar from "../NavBar";
import Table from "react-bootstrap/Table";
import { ChatContext } from "../../context/ChatProvider";
import SupervisorNavbar from "../Navbar/SupervisorNavbar";
const Help = () => {
  const { user } = useContext(ChatContext);
  return (
    <div style={{ backgroundColor: "#0490db", height: "793px" }}>
      {user && user.type === "Student" && <NavBar />}
      {user && user.type === "Supervisor" && <SupervisorNavbar />}

      <div>
        <Container>
          <Row
            style={{
              height: "350px",
              backgroundColor: "#052f72",
              color: "white",
              marginTop: "100px",
            }}
          >
            <Col>
              <h3 style={{ marginTop: "15px" }}>Request</h3>
            </Col>

            <Col>
              <Button
                variant="primary"
                size="lg"
                active
                style={{ marginLeft: "450px", marginTop: "10px" }}
              >
                Request
              </Button>
            </Col>

            <Row style={{ alignItems: "center", justifyContent: "center" }}>
              <Table
                striped
                style={{
                  backgroundColor: "grey",
                  color: "white",
                  width: "90%",
                  border: "none",
                }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Help;
