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
      {/* {console.log(groupLeader.groupLeader)} */}

      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "purple" }}
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
              <Nav.Link as={NavLink} to="">
                Announcement
              </Nav.Link>
              <Nav.Link as={NavLink} to="/view-help">
                Help
              </Nav.Link>
              <Nav.Link as={NavLink} to="">
                Resources
              </Nav.Link>
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
    </Box>
  );
}

export default NavBar;
