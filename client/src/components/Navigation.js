import React from 'react';
import { Link } from 'react-router-dom';
import {Nav, Navbar, Container} from 'react-bootstrap';

import Auth from '../utils/auth';



const Navigation = () => {
  const logout = (event) => {
    event.preventDefault();
    // Auth.logout();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ms-auto'>
            <Nav.Item>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/chat">
                Chat
              </Nav.Link>
            </Nav.Item>
            {Auth.loggedIn() ? (
              <>
                <Nav.Item>
                  <Nav.Link onClick={logout}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/signup" >
                    Signup
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export default Navigation;
