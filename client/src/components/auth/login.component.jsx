import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import Front from '../../assets/front_cut.JPG';

//redux
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';

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
  height: 500px;
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

  .LoginBtn {
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

const Login = ({ isAuthenticated, loginUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await loginUser(email, password);
    console.log(formData);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Container img={Front}>
        <Form onSubmit={onSubmit}>
          <label className="title">Login</label>
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

          <input className="LoginBtn" type="submit" value="Login"></input>
          <p>Not a member yet?</p>
          <Link to="/register">
            <p className="redirect">Sign Up</p>
          </Link>
        </Form>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(Login);
