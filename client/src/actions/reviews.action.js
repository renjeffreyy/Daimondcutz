import api from '../utils/api';
import { setAlert } from './alert';
import { GET_REVIEW } from './types';

export const fetchReviews = () => async (dispatch) => {
  try {
    const reviews = await api.get('/reviews');

    dispatch({
      type: GET_REVIEW,
      payload: reviews.data,
    });
  } catch (error) {
    setAlert('something went wrong with loading the reviews');
    console.log(error);
  }
};

export const postReview = ({
  userId,
  userFirstName,
  userLastName,
  reviewText,
  stars,
  date,
}) => async (dispatch) => {
  const body = JSON.stringify({
    userId,
    userFirstName,
    userLastName,
    reviewText,
    stars,
    date,
  });

  try {
    const response = await api.post('/reviews', body);

    dispatch(fetchReviews());
    dispatch(setAlert(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/reviews/${id}`);
    dispatch(fetchReviews());
    dispatch(setAlert(response.data.msg));
  } catch (error) {
    console.error(error);
  }
};
