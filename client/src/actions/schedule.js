import {
  SET_DATE,
  GET_SCHEDULE_ON_DATE,
  LOAD_APPOINTMENTS,
  CLEAR_DATES,
} from './types';
import api from '../utils/api';
import moment from 'moment';
import { setAlert } from './alert';

export const setDate = ({ date }) => async (dispatch) => {
  try {
    const todaysDate = new Date();
    const momentToday = moment(todaysDate).startOf('day').unix() * 1000;
    const reqDate = date.getTime();

    if (momentToday > reqDate) {
      dispatch(
        setAlert('That date has already passed. Please pick another date')
      );
      dispatch({ type: CLEAR_DATES, payload: date });
    } else {
      dispatch({ type: SET_DATE, payload: date });
      await dispatch(getEvents({ date }));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getEvents = ({ date }) => async (dispatch) => {
  const body = JSON.stringify({ date });

  try {
    const res = await api.post('/calendar', body);
    dispatch(getAvailableTimes(res.data, date));
  } catch (error) {
    console.log(error);
  }
};

export const getAvailableTimes = (busyTimes, date) => async (dispatch) => {
  const startOfDay = new Date(date).getTime();
  const endOfDay = new Date(date).setHours(23, 59, 59, 999);
  const haircutLength = 2700000; /* time it takes for 1 haircut 45 minutes in miliseconds*/
  const freeBlock = [];

  const unavailableTimes = busyTimes.map((time) => {
    return {
      start: new Date(time.start).getTime(),
      end: new Date(time.end).getTime(),
    };
  });

  for (let i = startOfDay; i < endOfDay; i += haircutLength) {
    let check = true;
    for (let j = 0; j < unavailableTimes.length; j++) {
      if (i >= unavailableTimes[j].start && i < unavailableTimes[j].end) {
        check = false;
        break;
      }
    }
    if (check) {
      freeBlock.push(i);
    }
  }

  const availableTimeSlots = freeBlock.map((timeSlot) => {
    return moment(timeSlot).format();
  });

  dispatch({ type: GET_SCHEDULE_ON_DATE, payload: availableTimeSlots });
};

export const bookAppointment = (time) => async (dispatch) => {
  const body = JSON.stringify({ date: time });

  try {
    const res = await api.post('/calendar/appointments', body);

    if (res.status === 200) {
      dispatch(
        setAlert(
          `your appointment has been booked for ${moment(time).format(
            'MMMM Do YYYY, h:mm a'
          )}`
        )
      );
      dispatch(setAlert(res.data.msg));
      dispatch(getMyAppointments());
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyAppointments = () => async (dispatch) => {
  try {
    const res = await api.get('/calendar/appointments');
    dispatch({ type: LOAD_APPOINTMENTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const cancelAppointment = (appointmentId) => async (dispatch) => {
  try {
    const res = await api.delete(`/calendar/appointments/${appointmentId}`);

    dispatch(setAlert('appointment deleted!'));
    dispatch(getMyAppointments());
  } catch (error) {
    console.log(error);
  }
};

export const removeScheduledAppointment = (date, appointmentsArray) => (
  dispatch
) => {
  const newApptArray = appointmentsArray.filter((appt) => appt !== date);

  dispatch({ type: GET_SCHEDULE_ON_DATE, payload: newApptArray });
};
