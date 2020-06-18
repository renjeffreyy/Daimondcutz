import React, { useState } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { bookAppointment } from '../../actions/schedule';

const Container = styled.div`
  display: flex;
  flex-direction: row-gap;
  flex-wrap: wrap;
  .availableTimes {
    flex-basis: 100%;
  }
`;

const Schedule = ({
  myAppointments,
  isAuthenticated,
  bookAppointment,
  availableTimes,
  date,
  setAlert,
  ...props
}) => {
  const [appointmentDate, setAppointmentDate] = useState({
    appointment: null,
  });

  const dateSelectionClick = (index) => {
    setAppointmentDate({
      appointment: availableTimes[index],
    });
    console.log(appointmentDate);
  };

  const appointmentCheck = (app) => {
    const todaysDate = new Date().getTime();
    return moment(app.startTime).unix() * 1000 > todaysDate;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (isAuthenticated === false) {
      setAlert('Please sign in to make an appointment.');
      setAppointmentDate({
        appointment: null,
      });
    } else if (myAppointments.filter(appointmentCheck).length > 0) {
      setAlert('You already have an appointment scheduled!');
    } else {
      bookAppointment(appointmentDate.appointment);
      setAppointmentDate({
        appointment: null,
      });
    }
  };
  return (
    <Container className={props.className}>
      <form onSubmit={onSubmit}>
        <p>
          Appointments on <Moment format="YYYY-MM-DD" date={date} />
        </p>
        {availableTimes.length > 0 ? (
          availableTimes.map((time) => {
            return (
              <div key={availableTimes.indexOf(time)}>
                <Moment
                  className="availableTimes"
                  format="MMMM Do YYYY, h:mm a"
                  date={time}
                />
                <input
                  type="button"
                  value="book this time"
                  onClick={() =>
                    dateSelectionClick(availableTimes.indexOf(time))
                  }
                />
              </div>
            );
          })
        ) : (
          <p>no available times!</p>
        )}
        {appointmentDate.appointment == null ? (
          <></>
        ) : (
          <>
            <label>
              Confirm your appointment for{' '}
              {moment(appointmentDate.appointment).format(
                'MMMM Do YYYY, h:mm a'
              )}
              .
            </label>
            <input type="submit" value="confirm" />
            <input
              type="button"
              value="pick another time"
              onClick={() => setAppointmentDate({ appointment: null })}
            />
          </>
        )}
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  date: state.schedule.date,
  availableTimes: state.schedule.availableTimes,
  isAuthenticated: state.auth.isAuthenticated,
  myAppointments: state.schedule.appointments,
});

export default connect(mapStateToProps, { setAlert, bookAppointment })(
  Schedule
);
