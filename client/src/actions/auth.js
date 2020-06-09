import api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  LOGOUT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await api.get('/auth');

    await dispatch({
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
export const registerUser = (firstName, lastName, email, password) => async (
  dispatch
) => {
  const body = JSON.stringify({ firstName, lastName, email, password });

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
    // const response = await axios.post('/auth', body, config);

    console.log(response);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    const errors = error.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout /clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
