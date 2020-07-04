import React from 'react';
import styled from 'styled-components';
import Schedule from '../scheduling/Schedule';
//components
import Calendar from '../scheduling/Calendar';

const Container = styled.div`
  margin-top: 100px;
`;

const Title = styled.p`
  font-size: 2rem;
  grid-row: 1/2;
  grid-column: 1/11;
  text-align: center;
  margin: 20 px 0;
`;

const Appointments = () => {
  return (
    <Container className="container">
      <Title>Appointments</Title>
      <Calendar />
      <Schedule />
    </Container>
  );
};

export default Appointments;
