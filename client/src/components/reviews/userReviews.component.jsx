import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.div`
  width: 80vw;
  height: 50px;
  background-color: lightblue;
`;

const UserReview = () => {
  return <Container>User reviews here</Container>;
};

export default connect()(UserReview);
