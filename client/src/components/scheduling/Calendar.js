import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setDate } from '../../actions/schedule';
import 'react-calendar/dist/Calendar.css';

const Container = styled.div`
  width: 100%;
  height: 50%;

  .Calendar-Container {
    text-align: center;
    margin: auto;
    height: 400px;
    width: 90%;
  }

  .Calendar-Tile {
    height: 50px;
  }
`;

const Calander = ({ setDate, ...props }) => {
  const onChange = (value) => {
    setDate({ date: value });
  };

  return (
    <Container className="container">
      <Calendar
        showFixedNumberOfWeeks={true}
        tileClassName="Calendar-Tile"
        className="Calendar-Container"
        onChange={(value) => onChange(value)}
        calendarType="US"
        showNeighboringMonth={false}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  date: state.schedule.date,
});

export default connect(mapStateToProps, { setDate })(Calander);
