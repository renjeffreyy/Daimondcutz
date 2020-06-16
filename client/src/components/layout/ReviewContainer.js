import React from 'react';
import styled from 'styled-components';
//components
import UserReview from '../reviews/userReviews.component';
import ReviewSubmission from '../reviews/reviewSubmission.component';

//redux
import { connect } from 'react-redux';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);

  .userReviews {
    grid-row: 3 /7;
    grid-column: 3/9;
    background-color: white;
  }

  .reviewSubmission {
    grid-row: 7 /10;
    grid-column: 3/9;
    background-color: lightblue;
  }
`;

const ReviewContainer = ({ isAuthenticated }) => {
  return (
    <Container>
      <UserReview className="userReviews" />

      {isAuthenticated ? (
        <ReviewSubmission className="reviewSubmission" />
      ) : (
        <div className="reviewSubmission">
          <p>Login to submit a review!</p>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ReviewContainer);
