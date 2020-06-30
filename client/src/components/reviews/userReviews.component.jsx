import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { fetchReviews } from '../../actions/reviews.action';

const Container = styled.div`
  .reviewContainer {
    display: flex;
    flex-direction: column;
    max-height: 250px;
    width: 100%;
  }

  .reviewBubble {
    padding: 10px;
    margin: 2.5px 5px;
    border: black solid 3px;
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

const ScrollBox = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: rows;
  flex-wrap: wrap;
  max-height: 80%;
  min-height: 80%;
`;

const UserReview = ({ reviews, fetchReviews, className }) => {
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
  return (
    <Container className={className}>
      <h1>Reviews</h1>
      <ScrollBox>
        {reviews.length > 0 &&
          reviews.map((items) => {
            return (
              <div key={items._id} className="reviewContainer">
                <div className="reviewBubble">
                  <p className="userName">
                    {items.userFirstName} {items.userLastName} {items.stars} /5
                    stars
                    <span className="date">
                      <Moment date={items.date} format="MM/DD/YYYY" />
                    </span>
                  </p>
                  <p>{items.reviewText}</p>
                </div>
              </div>
            );
          })}
      </ScrollBox>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  reviews: state.reviews.reviews,
});

export default connect(mapStateToProps, { fetchReviews })(UserReview);
