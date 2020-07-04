import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { getMyAppointments, cancelAppointment } from '../../actions/schedule';
import { fetchReviews, deleteReview } from '../../actions/reviews.action';
import Moment from 'react-moment';
import moment from 'moment';
import { setAlert } from '../../actions/alert';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  margin-top: 75px;
  .welcome {
    text-align: center;
    font-size: 2rem;
    margin: 10px;
  }
`;

const AppointmentsDiv = styled.div`
  grid-row: 3/7;
  grid-column: 1/3;
  border: 2px solid black;
  margin: 20px 20px;
  overflow: scroll;
  height: 300px;

  .upcomingAppts {
    font-size: 1.2rem;
    margin: 10px 20px;
  }

  .appts {
    margin: 0px 20px;
  }
`;

const ReviewsDiv = styled(AppointmentsDiv)`
  .reviewTitle {
    font-size: 1.2rem;
    margin: 10px 20px;
  }

  .reviews {
    margin: 0px 20px;
  }

  .deleteBtn {
    color: red;
    display: inline-block;

    &:hover {
      color: darkcyan;
    }
  }
`;

const Dashboard = ({
  cancelAppointment,
  setAlert,
  fetchReviews,
  myAppointments,
  firstName,
  getMyAppointments,
  reviews,
  deleteReview,
  id,
}) => {
  useEffect(() => {
    loadUser();
    getMyAppointments();
    fetchReviews();
  }, [getMyAppointments, fetchReviews]);

  const [btnDisplay, setBtnDisplay] = useState({
    confirmCancelAppt: false,
  });

  const cancelAppClick = (id) => {
    cancelAppointment(id);
  };

  const deleteUserReview = (id) => {
    deleteReview(id);
  };

  const todaysDate = new Date().getTime();
  return (
    <DashboardContainer className="container">
      {firstName && <p className="welcome">Welcome {firstName}</p>}
      <AppointmentsDiv>
        <p className="upcomingAppts">Upcoming Appointments</p>
        {myAppointments
          .filter((app) => {
            return moment(app.startTime).unix() * 1000 > todaysDate;
          })
          .map((app) => {
            return (
              <div key={app._id} className="appts">
                <p>
                  <Moment
                    date={app.startTime}
                    format="dddd MMMM Do YYYY, h:mm a"
                  />
                </p>
                <button
                  onClick={() => setBtnDisplay({ confirmCancelAppt: true })}
                >
                  Cancel Appointment
                </button>

                {btnDisplay.confirmCancelAppt && (
                  <button onClick={() => cancelAppClick(app._id)}>
                    Confirm Cancelation
                  </button>
                )}
              </div>
            );
          })}

        <p className="upcomingAppts">Appointment History</p>
        {myAppointments
          .filter((app) => {
            return moment(app.startTime).unix() * 1000 < todaysDate;
          })
          .map((app) => {
            return (
              <div key={app._id} className="appts">
                <p>
                  <Moment
                    date={app.startTime}
                    format="dddd MMMM Do YYYY, h:mm a"
                  />
                </p>
              </div>
            );
          })}
      </AppointmentsDiv>

      <ReviewsDiv>
        <p className="reviewTitle">Your Reviews</p>
        {reviews
          .filter((review) => {
            return review.userId === id;
          })
          .map((review) => {
            return (
              <div key={review._id} className="reviews">
                <p className="userName">
                  {review.userFirstName} {review.userLastName}{' '}
                  <span className="date">
                    <Moment date={review.date} format="MM/DD/YYYY" />
                  </span>
                </p>
                <p>{review.reviewText}</p>
                <div>
                  <p
                    className="deleteBtn"
                    onClick={() => deleteUserReview(review._id)}
                  >
                    Delete
                  </p>
                </div>
              </div>
            );
          })}
      </ReviewsDiv>
    </DashboardContainer>
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
  setAlert,
  deleteReview,
})(Dashboard);
