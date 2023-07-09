import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png";
import { ChatContext } from "../../context/ChatProvider";

function SupervisorNavbar(props) {
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

      <img
        src="https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg" // Use your imported logo image here
        width="60"
        height="60"
        className="d-inline-block align-top"
        alt="Logo"
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
              to="/supervisor-dashboard"
              className="nav-link-card"
              activeClassName="active"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/view-groups"
              className="nav-link-card"
              activeClassName="active"
            >
              Groups
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/group-proposals"
              className="nav-link-card"
              activeClassName="active"
            >
              Proposals
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/discussion"
              className="nav-link-card"
              activeClassName="active"
            >
              Discussion
            </Nav.Link>
            {/* <Nav.Link as={NavLink} to="">
              Announcement
            </Nav.Link> */}
            <Nav.Link
              as={NavLink}
              to="/view-help"
              className="nav-link-card"
              activeClassName="active"
            >
              Help
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/edit-preference"
              className="nav-link-card"
              activeClassName="active"
            >
              Edit Preference
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

export default SupervisorNavbar;
