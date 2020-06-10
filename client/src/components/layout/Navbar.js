import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logOut } from '../../actions/auth';

//redux
import { connect } from 'react-redux';

const NavContainer = styled.div`
  position: fixed;
  right: 0;
  /* background-color: rgb(0, 0, 0, 0.7); */
  width: 100vw;
  height: 60px;
  text-align: right;
  margin-top: 30px;
  margin-right: 30px;

  .Nav {
    font-size: 2rem;
    color: red;
    font-family: 'Playfair Display', serif;
    text-decoration: none;
    margin: 50px 20px;

    &:hover {
      color: #fad643;
    }
  }
`;

const Navbar = ({ isAuthenticated, logOut }) => {
  return (
    <NavContainer>
      <Link className="Nav" to="/">
        Home
      </Link>
      <Link className="Nav" to="/Appointments">
        Appointments
      </Link>
      <Link className="Nav" to="/reviews">
        Reviews
      </Link>
      {isAuthenticated ? (
        <>
          <Link className="Nav" to="/dashboard">
            My Account
          </Link>
          <Link onClick={() => logOut()} className="Nav" to="/login">
            Log Out
          </Link>
        </>
      ) : (
        <Link to="/login" className="Nav">
          Login
        </Link>
      )}
    </NavContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logOut })(Navbar);
