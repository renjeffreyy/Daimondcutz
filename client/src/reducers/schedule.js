import { SET_DATE } from '../actions/types';

//convert the date to iso string for moment.js
const date = new Date();
const iso = date.toISOString();

const initialState = {
  date: iso,
  availableTimes: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DATE:
      return {
        ...state,
        date: payload,
      };
    default:
      return state;
  }
};
