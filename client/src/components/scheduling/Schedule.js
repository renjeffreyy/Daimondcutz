import React, { useState } from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import {
  bookAppointment,
  setDate,
  removeScheduledAppointment,
} from '../../actions/schedule';
const Appointments = styled.div`
  margin: 10px 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row-gap;
  flex-wrap: wrap;
  .availableTimes {
    flex-basis: 100%;
    margin: 20px;
  }
`;

const Titles = styled.p`
  margin: 20px;
  display: inline-block;
`;

const PickCalendarText = styled.p`
  font-weight: bold;
  font-size: 2rem;
  margin: 20px;
`;

const Input = styled.input`
  margin: 20px 10px 20px 20px;
`;

const Schedule = ({
  myAppointments,
  isAuthenticated,
  bookAppointment,
  availableTimes,
  removeScheduledAppointment,
  showScheduleInstructions,
  date,
  setAlert,
  setDate,
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
      removeScheduledAppointment(appointmentDate.appointment, availableTimes);
      setAppointmentDate({
        appointment: null,
      });
    }
  };
  return (
    <Container className={props.className}>
      {showScheduleInstructions === true ? (
        <PickCalendarText>
          Pick a calendar date to check availability
        </PickCalendarText>
      ) : (
        <form onSubmit={onSubmit}>
          <Titles>
            Appointments on <Moment format="YYYY-MM-DD" date={date} />
          </Titles>
          {appointmentDate.appointment == null ? (
            <></>
          ) : (
            <>
              <Titles>
                Confirm your appointment for{' '}
                {moment(appointmentDate.appointment).format(
                  'MMMM Do YYYY, h:mm a'
                )}
                .
              </Titles>
              <Input type="submit" value="confirm" />
              <Input
                type="button"
                value="pick another time"
                onClick={() => setAppointmentDate({ appointment: null })}
              />
            </>
          )}
          <div className="row">
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => {
                return (
                  <Appointments
                    key={availableTimes.indexOf(time)}
                    className="col-lg-6"
                  >
                    <Moment
                      className="availableTimes"
                      format="MMMM Do YYYY, h:mm a"
                      date={time}
                    />
                    <input
                      type="button"
                      value="book"
                      onClick={() =>
                        dateSelectionClick(availableTimes.indexOf(time))
                      }
                    />
                  </Appointments>
                );
              })
            ) : (
              <Titles>no available times! Pick another date.</Titles>
            )}
          </div>
        </form>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  date: state.schedule.date,
  availableTimes: state.schedule.availableTimes,
  isAuthenticated: state.auth.isAuthenticated,
  myAppointments: state.schedule.appointments,
  showScheduleInstructions: state.schedule.showScheduleInstructions,
});

export default connect(mapStateToProps, {
  setAlert,
  removeScheduledAppointment,
  setDate,
  bookAppointment,
})(Schedule);
