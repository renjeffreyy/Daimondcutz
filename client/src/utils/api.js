import axios from 'axios';
import store from '../store';
import { CLEAR_PROFILE, LOGOUT } from '../actions/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.msg === 'Token is not valid') {
      store.dispatch({ type: LOGOUT });
      store.dispatch({ type: CLEAR_PROFILE });
    }
    return Promise.reject(error);
  }
);

export default api;
