import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { getMyAppointments, cancelAppointment } from '../../actions/schedule';
import { fetchReviews } from '../../actions/reviews.action';
import Moment from 'react-moment';
import moment from 'moment';

const Dashboard = ({
  cancelAppointment,
  fetchReviews,
  myAppointments,
  firstName,
  getMyAppointments,
  reviews,
  id,
}) => {
  useEffect(() => {
    loadUser();
    getMyAppointments();
    fetchReviews();
  }, [getMyAppointments, fetchReviews]);

  const [btnDisplay, setBtnDisplay] = useState(false);

  const cancelAppClick = (id) => {
    cancelAppointment(id);
    console.log('appointment canceled clicked for: ', id);
  };

  const todaysDate = new Date().getTime();
  return (
    <>
      {firstName && <p>Welcome {firstName}</p>}

      <p>Upcoming appointments</p>
      {myAppointments
        .filter((app) => {
          return moment(app.startTime).unix() * 1000 > todaysDate;
        })
        .map((app) => {
          return (
            <div key={app._id}>
              <p>
                <Moment
                  date={app.startTime}
                  format="dddd MMMM Do YYYY, h:mm a"
                />{' '}
                -{' '}
                <Moment format="dddd MMMM Do YYYY, h:mm a" date={app.endTime} />
              </p>
              <button onClick={() => setBtnDisplay(true)}>
                Cancel Appointment
              </button>

              {btnDisplay && (
                <button onClick={() => cancelAppClick(app._id)}>
                  Confirm Cancelation
                </button>
              )}
            </div>
          );
        })}

      <p>Appointment History</p>
      {myAppointments
        .filter((app) => {
          return moment(app.startTime).unix() * 1000 < todaysDate;
        })
        .map((app) => {
          return (
            <div key={app._id}>
              <p>
                <Moment
                  date={app.startTime}
                  format="dddd MMMM Do YYYY, h:mm a"
                />{' '}
                -{' '}
                <Moment format="dddd MMMM Do YYYY, h:mm a" date={app.endTime} />
              </p>
            </div>
          );
        })}
      <div>
        <p>Your Reviews</p>
        {reviews
          .filter((review) => {
            return review.userId === id;
          })
          .map((review) => {
            return (
              <div key={review._id}>
                <p className="userName">
                  {review.userFirstName} {review.userLastName}{' '}
                  <span className="date">
                    <Moment date={review.date} format="MM/DD/YYYY" />
                  </span>
                </p>
                <p>{review.reviewText}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  id: state.auth.user._id,
  firstName: state.auth.user.firstName,
  myAppointments: state.schedule.appointments,
  reviews: state.reviews.reviews,
});

export default connect(mapStateToProps, {
  loadUser,
  getMyAppointments,
  cancelAppointment,
  fetchReviews,
})(Dashboard);
