import {
  SET_DATE,
  GET_SCHEDULE_ON_DATE,
  LOAD_APPOINTMENTS,
  CLEAR_DATES,
  CLEAR_APPOINTMENTS,
} from '../actions/types';

//convert the date to iso string for moment.js
const date = new Date();
const iso = date.toISOString();

const initialState = {
  date: iso,
  availableTimes: [],
  appointments: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DATE:
      return {
        ...state,
        date: payload,
      };
    case GET_SCHEDULE_ON_DATE:
      return {
        ...state,
        availableTimes: [...payload],
      };
    case LOAD_APPOINTMENTS:
      return {
        ...state,
        appointments: [...payload],
      };
    case CLEAR_DATES:
      return {
        ...state,
        availableTimes: [],
        date: payload,
      };
    case CLEAR_APPOINTMENTS:
      return {
        ...state,
        date: iso,
        availableTimes: [],
        appointments: [],
      };
    default:
      return state;
  }
};
