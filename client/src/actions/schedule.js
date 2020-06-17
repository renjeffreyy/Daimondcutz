import { SET_DATE, GET_SCHEDULE_ON_DATE } from './types';
import api from '../utils/api';
import moment from 'moment';
import { setAlert } from './alert';

export const setDate = ({ date }) => async (dispatch) => {
  dispatch({ type: SET_DATE, payload: date });
  await dispatch(getEvents({ date }));
};

export const getEvents = ({ date }) => async (dispatch) => {
  const body = JSON.stringify({ date });

  try {
    const res = await api.post('/calendar', body);
    dispatch(getAvailableTimes(res.data, date));
    // dispatch({
    //   type: GET_SCHEDULE_ON_DATE,
    //   payload: res.data,
    // });
  } catch (error) {
    console.log(error);
  }
};

export const getAvailableTimes = (busyTimes, date) => async (dispatch) => {
  const startOfDay = new Date(date).getTime();
  const endOfDay = new Date(date).setHours(23, 59, 59, 999);
  const haircutLength = 2700000; /* time it takes for 1 haircut 45 minutes in miliseconds*/
  const freeBlock = [];
  console.log('these are the blockec out times', busyTimes);

  const unavailableTimes = busyTimes.map((time) => {
    return {
      start: new Date(time.start).getTime(),
      end: new Date(time.end).getTime(),
    };
  });
  console.log('these are the busy time', unavailableTimes);

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

  console.log('these are the times outside of busy times: ', freeBlock);

  const availableTimeSlots = freeBlock.map((timeSlot) => {
    return moment(timeSlot).format();
  });

  // console.log('available times action firing');
  // console.log('the date we are checking is ', startOfDay);
  // console.log(startOfDay, endOfDay);
  // console.log(moment(startOfDay).format(), moment(endOfDay).format());
  // console.log(freeBlock);
  // console.log(availableTimeSlots);
  dispatch({ type: GET_SCHEDULE_ON_DATE, payload: availableTimeSlots });
};

export const bookAppointment = (time) => async (dispatch) => {
  const body = JSON.stringify({ date: time });
  console.log(body);

  try {
    const res = await api.post('/calendar/appointments', body);
    console.log('here is the resposne', res);

    if (res.status == 200) {
      // dispatch(
      //   setAlert(
      //     `your appointment has been booked for ${moment(time).format(
      //       'MMMM Do YYYY, h:mm a'
      //     )}`
      //   )
      // );
      dispatch(setAlert(res.data.msg));
    }
  } catch (error) {
    console.log(error);
  }
};
