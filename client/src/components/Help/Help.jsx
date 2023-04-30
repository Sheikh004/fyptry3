import React from "react";
import { Container, Col, Button, Row } from "react-bootstrap";
import NavBar from "../NavBar";
import Table from "react-bootstrap/Table";

const Help = () => {
  return (
    <div style={{ backgroundColor: "#0B2B40", height: "793px" }}>
      <NavBar />

      <div>
        <Container>
          <Row
            style={{
              height: "350px",
              backgroundColor: "purple",
              color: "white",
              marginTop: "100px",
            }}
          >
            <Col>
              <h3 style={{ marginTop: "15px" }}>Request</h3>

              {/* <p style={{backgroundColor:"white", color:"black",height: "30px"}} >You have 26 announcements</p> */}
            </Col>

            <Col>
              <Button
                variant="primary"
                size="lg"
                active
                style={{ marginLeft: "450px", marginTop: "10px" }}
              >
                Primary button
              </Button>
            </Col>

            <Row style={{ alignItems: "center", justifyContent: "center" }}>
              <Table striped style={{ backgroundColor: "white", width: "90%" }}>
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
