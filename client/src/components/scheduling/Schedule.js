import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { connect } from 'react-redux';
const Container = styled.div``;

const Schedule = ({ availableTimes, date, ...props }) => {
  return (
    <Container className={props.className}>
      <span>
        Appointments on <Moment format="YYYY-MM-DD" date={date} />
      </span>
      {availableTimes.length > 0 ? (
        availableTimes.map((time) => {
          return <p>{time}</p>;
        })
      ) : (
        <p>no available times!</p>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  date: state.schedule.date,
  availableTimes: state.schedule.availableTimes,
});

export default connect(mapStateToProps)(Schedule);
