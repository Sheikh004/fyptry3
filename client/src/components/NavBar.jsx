import React, { useEffect, useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { ChatContext } from "../context/ChatProvider";
import { getGroupLeader } from "../api/api";
import { Box } from "@mui/material";

function NavBar(props) {
  const [groupLeader, setGroupLeader] = useState();
  const { user } = useContext(ChatContext);

  useEffect(() => {
    const checkGroupLeader = async () => {
      const data = await getGroupLeader(user.id);
      setGroupLeader(data);
    };
    checkGroupLeader();
  }, []);

  return (
    <Box>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{
          backgroundColor: "#28282B",
          flexDirection: "column",
        }}
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
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
            style={{ borderRadius: "80%" }}
          />
          <Navbar.Brand style={{ paddingTop: "8px" }}>E-FYP</Navbar.Brand>
        </div>
        <img
          src="https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg"
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
          Welcome Mahwish Waqas
        </h6>

        <Container style={{ alignItems: "center" }}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="flex-column">
              <Nav.Link as={NavLink} to="/student-dashboard">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/student-tasks-view">
                Task
              </Nav.Link>
              {user &&
                groupLeader &&
                user.email === groupLeader.groupLeader && (
                  <Nav.Link as={NavLink} to="/submission">
                    Submission
                  </Nav.Link>
                )}
              <Nav.Link as={NavLink} to="/discussion">
                Discussion
              </Nav.Link>
              {/* <Nav.Link as={NavLink} to="">Announcement</Nav.Link> */}
              <Nav.Link as={NavLink} to="/template-list">
                Template
              </Nav.Link>
              {/* <Nav.Link as={NavLink} to="">Resources</Nav.Link> */}

              <Nav.Link eventKey={2} href="/login" className="nav-link-card">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Box>
  );
}

export default NavBar;
