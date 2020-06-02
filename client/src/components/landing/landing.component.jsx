import React, { Fragment } from 'react';
import styled from 'styled-components';

//assets
import TableBlur from '../../assets/daimond.JPG';
import Front from '../../assets/front_cut.JPG';
import Side from '../../assets/side_cut.JPG';

const Container = styled.div`
  background-image: url(${(props) => props.img});
  width: 100vw;
  height: 100vh;
  background-size: cover;
`;

const Landing = (props) => {
  return (
    <Fragment>
      <Container img={TableBlur}></Container>
      <Container img={Front}></Container>
      <Container img={Side}></Container>
    </Fragment>
  );
};

export default Landing;
