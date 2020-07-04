import React from 'react';
import styled from 'styled-components';

import { logOut } from '../../actions/auth';
import logo from '../../assets/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Alert from '../layout/Alert';

//redux
import { connect } from 'react-redux';

const NavContainer = styled.div`
  position: fixed;
  img {
    height: 50px;
  }
  .navbar-logo-link {
    padding: 0;
  }
`;

const AlertContainer = styled.div`
  /* margin-top: 75px; */
  position: absolute;
`;

const Navbars = ({ isAuthenticated, logOut }) => {
  return (
    <NavContainer>
      <Navbar
        className="fixed-top"
        expand="md"
        collapseOnSelect
        variant="dark"
        bg="dark"
      >
        <Navbar.Brand>
          <Nav.Link className="Nav navbar-logo-link" href="/">
            <img src={logo} alt="Daimond cut logo" />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="Nav" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="Nav" href="/Appointments">
              Appointments
            </Nav.Link>
            <Nav.Link className="Nav" href="/reviews">
              Reviews
            </Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Link className="Nav" href="/dashboard">
                  My Account
                </Nav.Link>
                <Nav.Link
                  onClick={() => logOut()}
                  className="Nav"
                  href="/login"
                >
                  Log Out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login" className="Nav">
                  Login
                </Nav.Link>
                <Nav.Link href="/register" className="Nav">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AlertContainer>
        <Alert />
      </AlertContainer>
    </NavContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logOut })(Navbars);
