import { SET_DATE } from '../actions/types';

const initialState = {
  date: Date(),
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
