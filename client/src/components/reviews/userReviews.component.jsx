import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchReviews } from '../../actions/reviews.action';

const Container = styled.div`
  overflow: scroll;
`;

const UserReview = ({ reviews, fetchReviews, className }) => {
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
  return (
    <Container className={className}>
      User reviews here
      {reviews.length > 0 &&
        reviews.map((items) => {
          return (
            <div key={items._id}>
              <p>
                {items.firstName} {items.lastName}
              </p>
              <p>{items.reviewText}</p>
            </div>
          );
        })}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  reviews: state.reviews.reviews,
});

export default connect(mapStateToProps, { fetchReviews })(UserReview);
