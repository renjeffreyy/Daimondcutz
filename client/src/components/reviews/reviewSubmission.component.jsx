import React, { useState } from 'react';
import styled from 'styled-components';

//redux
import { connect } from 'react-redux';
import { postReview } from '../../actions/reviews.action';

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;

  textarea {
    display: flex;
    flex-basis: 90%;
    height: 100px;
  }

  .button {
    margin: 15px;
    width: 100px;
    height: 30px;
  }
`;

const ReviewSubmission = ({
  className,
  reduxUserId,
  reduxUserLastName,
  reduxUserFirstName,
  postReview,
}) => {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();

  const [formData, setFormData] = useState({
    userId: reduxUserId,
    userLastName: reduxUserLastName,
    userFirstName: reduxUserFirstName,
    reviewText: '',
    stars: '',
    date: isoDate,
  });

  const { reviewText, stars } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };

  const resetForm = () => {
    setFormData({ ...formData, reviewText: '' });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    postReview(formData);
    console.log(formData);
    resetForm();
  };

  return (
    <Container className={className}>
      <p>Submit a review</p>
      <Form onSubmit={onSubmit}>
        <textarea
          type="text"
          required
          onChange={onChange}
          name="reviewText"
          value={reviewText}
          max-length="250"
          min-length="1"
        />
        <input
          type="number"
          min="1"
          max="5"
          value={stars}
          name="stars"
          onChange={onChange}
        />
        <input className="button" type="submit" value="submit review" />
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  reduxUserId: state.auth.user._id,
  reduxUserFirstName: state.auth.user.firstName,
  reduxUserLastName: state.auth.user.lastName,
});

export default connect(mapStateToProps, { postReview })(ReviewSubmission);
