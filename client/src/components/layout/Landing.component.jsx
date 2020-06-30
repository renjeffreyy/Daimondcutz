import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//assets
import TableBlur from '../../assets/daimond.JPG';
import Side from '../../assets/side_cut.JPG';

//redux
import { connect } from 'react-redux';

const Container = styled.div`
  background-image: url(${TableBlur});
  /* width: 100vw; */
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

const ImgContainer = styled.div`
  height: 100%;
  background-image: url(${(props) => props.img});
  grid-column: 1/ 8;
  grid-row: 1/ 8;
  background-size: cover;
  background-position: center center;
  border-color: #fad643;
  border-width: 3px;
`;

const Landing = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <Container>
        {/* <ImgContainer img={TableBlur}></ImgContainer> */}
        <Link className="appointment-link" to="/Appointments">
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
