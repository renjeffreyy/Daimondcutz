import React from 'react';
import styled from 'styled-components';
//components
import UserReview from '../reviews/userReviews.component';
import ReviewSubmission from '../reviews/reviewSubmission.component';

//redux
import { connect } from 'react-redux';

const Container = styled.div`
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  .userReviews {
    height: 400px;
  }

  .reviewSubmission {
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
