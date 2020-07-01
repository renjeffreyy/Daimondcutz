import React from 'react';
import styled from 'styled-components';

import { logOut } from '../../actions/auth';
import logo from '../../assets/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

//redux
import { connect } from 'react-redux';

const NavContainer = styled.div`
  img {
    height: 50px;
  }
`;

const Navbars = ({ isAuthenticated, logOut }) => {
  return (
    <NavContainer>
      <Navbar expand="md" collapseOnSelect variant="dark" bg="dark">
        <Navbar.Brand>
          <Nav.Link className="Nav" href="/">
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
              <Nav.Link href="/login" className="Nav">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </NavContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logOut })(Navbars);
