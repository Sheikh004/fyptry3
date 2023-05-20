import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
function SupervisorNavbar(props) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "#052f72" }}
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            style={{ backgroundColor: "white" }}
            src={logo} // Use your imported logo image here
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
          />{" "}
        </Navbar.Brand>
        <Navbar.Brand href="#home">E-FYP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/supervisor-dashboard">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/view-groups">
              Groups
            </Nav.Link>
            <Nav.Link as={NavLink} to="/group-proposals">
              Proposals
            </Nav.Link>
            <Nav.Link as={NavLink} to="/discussion">
              Discussion
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="">
              Announcement
            </Nav.Link> */}
            <Nav.Link as={NavLink} to="/view-help">
              Help
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="">
              Resources
            </Nav.Link> */}
          </Nav>
          <Nav>
            <Navbar.Text>
              <FontAwesomeIcon icon={faUser} className="me-2" />
            </Navbar.Text>
            <Nav.Link eventKey={2} href="#memes">
              {" "}
              Log out{" "}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SupervisorNavbar;
