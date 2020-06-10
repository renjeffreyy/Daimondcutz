import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setDate } from '../../actions/schedule';

const Container = styled.div`
  width: 100%%;
  height: 50%;

  .Calendar-Container {
    height: 400px;
    background-color: black;
  }

  .Calendar-Tile {
    height: 50px;
  }
`;

const Calander = ({ setDate, ...props }) => {
  const onChange = (value) => {
    setDate(value);
  };

  return (
    <Container className={props.className}>
      <p>Calendar</p>
      <Calendar
        showFixedNumberOfWeeks={true}
        tileClassName="Calendar-Tile"
        className="Calendar-Container"
        onChange={(value) => onChange(value)}
        calendarType="ISO 8601"
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  date: state.schedule.date,
});

export default connect(mapStateToProps, { setDate })(Calander);
