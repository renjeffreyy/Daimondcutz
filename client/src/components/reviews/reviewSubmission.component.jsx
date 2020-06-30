import React, { useState } from 'react';
import styled from 'styled-components';

//redux
import { connect } from 'react-redux';
import { postReview } from '../../actions/reviews.action';

const Container = styled.div``;

const Form = styled.form`
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;

  textarea {
    display: flex;
    flex-basis: 100%;
    height: 100px;
    margin: auto;
  }

  .button {
    margin: 15px;
    width: 100px;
    height: 30px;
  }
`;

const Title = styled.p`
  margin: 10px 0px;
`;

const Radio = styled.input`
  width: 30px;
  height: 30px;
`;

const TextArea = styled.textarea`
  width: 100%;
`;

const SubmitButton = styled.input`
  /* width: 100px; */
  height: 60px;
  &:hover {
    background-color: #343a40;
    color: rgba(255, 255, 255, 0.75);
  }
`;

const Span = styled.span`
  flex-basis: 100%;
  margin-top: 10px;
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
      <Title>Submit a review</Title>
      <Form onSubmit={onSubmit}>
        <TextArea
          type="text"
          required
          onChange={onChange}
          name="reviewText"
          value={reviewText}
          max-length="250"
          min-length="1"
        />
        <Span>
          <label>Rate your experience!</label>
          <Radio
            type="number"
            min="1"
            max="5"
            value={stars}
            name="stars"
            onChange={onChange}
            placeholder="5"
            required
          />
        </Span>
        <SubmitButton className="button" type="submit" value="submit" />
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
