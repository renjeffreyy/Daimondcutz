import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { fetchReviews } from '../../actions/reviews.action';

const Container = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  .reviewContainer {
    display: flex;
    flex-direction: row;
    flex-basis: 100%;
  }

  .reviewBubble {
    /* border-radius: 25px; */
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 2.5px 5px;
    background-color: red;
  }
  .userName {
    display: flex;

    flex-basis: 100%;
  }

  .date {
    color: gray;
    margin-left: 5px;
  }
`;

const UserReview = ({ reviews, fetchReviews, className }) => {
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
  return (
    <Container className={className}>
      {reviews.length > 0 &&
        reviews.map((items) => {
          return (
            <div className="reviewContainer">
              <div className="reviewBubble" key={items._id}>
                <p className="userName">
                  {items.userFirstName} {items.userLastName}{' '}
                  <span className="date">
                    <Moment date={items.date} format="MM/DD/YYYY" />
                  </span>
                </p>
                <p>{items.reviewText}</p>
              </div>
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
