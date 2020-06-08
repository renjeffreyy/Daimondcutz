import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerUser } from '../../actions/auth';

import Front from '../../assets/front_cut.JPG';

const Container = styled.div`
  background-image: url(${(props) => props.img});
  width: 100vw;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;

  @media (min-width: 700px) {
    background-position: left;
  }
`;

const Form = styled.form`
  width: 400px;
  height: 600px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  flex-direction: column;
  border-color: white;
  border-style: solid;
  border-width: 2px;

  @media (min-width: 500px) {
    margin-left: 100px;
  }

  .title {
    color: white;
    font-size: 3rem;
    margin: 10px;
  }

  input {
    display: block;
    margin: 10px auto;
    width: 80%;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border-color: white;
    border-style: solid;
    border-width: 2px;
    font-weight: 800;
    font-size: 1rem;
    padding-left: 4px;
  }

  .RegisterBtn {
    background-color: transparent;
    color: white;
    padding: 1px;
    width: 50%;
    font-weight: 800;
    box-sizing: content-box;

    &:hover {
      background-color: white;
      color: black;
    }
  }

  p {
    color: white;
    margin: 5px;
  }

  .redirect {
    &:hover {
      color: lightblue;
    }
  }
`;

const Register = ({ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert('Passwords do not match');
    } else {
      registerUser({ firstName, lastName, email, password });
      console.log('submitted');
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Container img={Front}>
        <Form onSubmit={onSubmit}>
          <label className="title">Join Us</label>
          <input
            placeholder="First Name"
            type="text"
            name="firstName"
            value={firstName}
            onChange={onChange}
            required
          ></input>
          <input
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={lastName}
            onChange={onChange}
            required
          ></input>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          ></input>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          ></input>
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            minLength="6"
            required
          ></input>
          <input className="RegisterBtn" type="submit" value="Register"></input>
          <p>Already a member?</p>
          <Link to="/login">
            <p className="redirect">Sign In</p>
          </Link>
        </Form>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticateds,
});

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
