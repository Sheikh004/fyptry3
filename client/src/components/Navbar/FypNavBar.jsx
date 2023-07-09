import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ChatContext } from "../../context/ChatProvider";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";

function FypNavBar(props) {
  const { user } = useContext(ChatContext);

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
          width="40"
          height="40"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ borderRadius: "80%" }}
        />
        <Navbar.Brand style={{ paddingTop: "8px" }}>E-FYP</Navbar.Brand>
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
          paddingTop: "8px",
          paddingBottom: "10px",
          color: "white",
          textAlign: "center",
        }}
      >
        Welcome {user.name}
      </h6>

      <Container style={{ alignItems: "center" }}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="flex-column">
            <Nav.Link
              as={NavLink}
              to="/fyp-committee-dashboard"
              className="nav-link-card"
              activeClassName="active"
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/reviewer-management"
              className="nav-link-card"
              activeClassName="active"
            >
              Reviewer Management
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/evaluator-management"
              className="nav-link-card"
              activeClassName="active"
            >
              Evaluator Management
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/event-management"
              className="nav-link-card"
              activeClassName="active"
            >
              Event Manager
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/template"
              className="nav-link-card"
              activeClassName="active"
            >
              Template Support
            </Nav.Link>

            <Nav.Link eventKey={2} href="/login" className="nav-link-card">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FypNavBar;
