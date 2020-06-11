import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import schedule from './schedule';
import reviews from './reviews.reducer';

export default combineReducers({
  auth,
  alert,
  schedule,
  reviews,
});
