import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import schedule from './schedule';

export default combineReducers({
  auth,
  alert,
  schedule,
});
