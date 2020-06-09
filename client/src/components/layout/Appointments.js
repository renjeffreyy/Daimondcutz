import React from 'react';
import styled from 'styled-components';
import Schedule from '../scheduling/Schedule';
//components
import Calendar from '../scheduling/Calendar';

const Title = styled.p`
  font-size: 2rem;
  grid-row: 1/2;
  grid-column: 1/11;
  text-align: center;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);

  .calendar {
    grid-row: 2/8;
    grid-column: 1/6;
  }
  .schedule {
    grid-row: 2/8;
    grid-column: 6/11;
  }
`;

const Appointments = () => {
  return (
    <Container>
      <Title>Appointments</Title>
      <Calendar className="calendar" />
      <Schedule className="schedule" />
    </Container>
  );
};

export default Appointments;
