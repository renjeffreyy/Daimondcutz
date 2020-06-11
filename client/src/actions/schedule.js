import { SET_DATE } from './types';
// import api from '../utils/api';

export const setDate = (date) => (dispatch) =>
  dispatch({ type: SET_DATE, payload: date });
