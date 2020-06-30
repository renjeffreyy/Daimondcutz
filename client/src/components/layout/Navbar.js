import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logOut } from '../../actions/auth';
import logo from '../../assets/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

//redux
import { connect } from 'react-redux';

const NavContainer = styled.div`
  /* position: fixed; */
  /* grid-auto-flow: row; */
  /* background-color: rgb(0, 0, 0, 0.5); */
  /* width: 100vw; */
  /* height: 10px; */
  /* border-bottom: 2px solid white; */
  .Nav {
    /* display: inline-block;
    font-size: 2rem;
    color: white;
    font-family: 'Playfair Display', serif;
    text-decoration: none;
    height: 100%;
    margin: 0px 20px;
    vertical-align: middle; */

    /* &:hover {
      color: #fad643;
    } */
    /* .navbar-styles {
      height: 1000px;
    } */
    img {
      /* transform: translateY(0px); */
      height: 50px;
    }
  }
  .login {
    display: inline-block;
    /* vertical-align: middle;  */
    /* height: 100%; */
    /* position: absolute;
    right: 0;
    margin: 0px 20px; */
  }
`;

const Navbars = ({ isAuthenticated, logOut }) => {
  return (
    <NavContainer>
      <Navbar expand="md" collapseOnSelect variant="dark" bg="dark">
        <Navbar.Brand>
          <Nav.Link className="Nav" href="/">
            <img src={logo} />
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
            {/* <div className="login"> */}
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
            {/* </div> */}
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
