import { REGISTER_SUCCESS } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}
