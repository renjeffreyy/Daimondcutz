import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_APPOINTMENTS,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const registerUser = ({
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
}) => async (dispatch) => {
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  });

  try {
    const response = await api.post('/user', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// login user
export const loginUser = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });

  try {
    const response = await api.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout /clear profile
export const logOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_APPOINTMENTS });
};
