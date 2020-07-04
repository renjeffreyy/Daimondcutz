import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//assets
import TableBlur from '../../assets/daimond.JPG';
import Side from '../../assets/side_cut.JPG';
import Logo from '../../assets/logo.png';
//redux
import { connect } from 'react-redux';

const Container = styled.div`
  background-image: url(${TableBlur});

  height: 100vh;
  background-size: cover;
  background-position: center;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  background-attachment: fixed;
  overflow: hidden;

  @media only screen and (max-width: 700px) {
    background-image: url(${Side});
  }

  .appointment-link {
    grid-column: 4 / 5;
    grid-row: 6/ 7;
    justify-self: center;
    align-self: center;
  }

  .desktop-button {
    @media only screen and (max-width: 700px) {
      display: none;
    }
  }

  .mobile-button {
    transform: translateY(-100px);
  }
`;

const Button = styled.button`
  width: 200px;
  height: 70px;

  background-color: black;
  color: #fad643;
  padding: 1px;
  font-weight: 800;
  font-size: 1.5rem;
  box-sizing: content-box;
  border-color: #fad643;
  border-width: 3px;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const DaimondTitle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 700px) {
    display: none;
  }

  img {
    height: 450px;
    max-width: 100vw;
    transform: translateY(-100px);

    @media only screen and (min-width: 700px) {
      display: none;
    }
  }
`;

const Landing = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <Container>
        <DaimondTitle>
          <img src={Logo} alt="Daimond cut logo" />
          <Link className="appointment-link mobile-button" to="/Appointments">
            <Button>Appointments</Button>
          </Link>
        </DaimondTitle>
        <Link className="appointment-link desktop-button" to="/Appointments">
          <Button>Appointments</Button>
        </Link>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
