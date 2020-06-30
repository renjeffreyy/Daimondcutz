import React from 'react';
import styled from 'styled-components';
//components
import UserReview from '../reviews/userReviews.component';
import ReviewSubmission from '../reviews/reviewSubmission.component';

//redux
import { connect } from 'react-redux';

const Container = styled.div`
  /* width: 100vw;
  height: 100vh;
  display: grid; */
  /* grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr); */
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  .userReviews {
    /* grid-row: 2 /7;
    grid-column: 2/10; */
    height: 400px;
  }

  .reviewSubmission {
    /* grid-row: 7 /10;
    grid-column: 2/10; */
    min-height: 250px;
  }
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

const ReviewContainer = ({ isAuthenticated }) => {
  return (
    <Container className="container">
      <UserReview className="userReviews" />

      {isAuthenticated ? (
        <ReviewSubmission className="reviewSubmission" />
      ) : (
        <div className="reviewSubmission">
          <Title>Login to submit a review!</Title>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ReviewContainer);
