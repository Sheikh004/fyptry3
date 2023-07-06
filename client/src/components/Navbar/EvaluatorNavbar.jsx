import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";

function EvaluatorNavbar(props) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "#28282B", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <img
          src={logo} // Use your imported logo image here
          width="50"
          height="50"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ borderRadius: "80%", backgroundColor: "white" }}
        />
        <Navbar.Brand style={{ paddingTop: "8px", paddingLeft: "10px" }}>
          E-FYP
        </Navbar.Brand>
      </div>

      <FontAwesomeIcon
        icon={faUser}
        size="2x"
        className="d-inline-block align-top"
        color="white"
        style={{ paddingTop: "20px" }}
      />

      <h6
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          color: "white",
          textAlign: "center",
        }}
      >
        Welcome Mahwish Waqas
      </h6>

      <Container
        style={{
          alignItems: "center",
          paddingTop: "400px",
          paddingLeft: "50px",
        }}
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link
              as={NavLink}
              to="/evaluator-groups"
              className="nav-link-card"
              activeClassName="active"
            >
              Home
            </Nav.Link>
            <Nav.Link eventKey={2} href="logout" className="nav-link-card">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EvaluatorNavbar;
