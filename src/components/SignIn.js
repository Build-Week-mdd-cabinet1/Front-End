import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #98fb98;
`;

const LoginWindow = styled.div`
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  width: 30%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  & form {
    width: 100%;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3cb371;
  color: white;
  fill: white;
  padding: 10px;
  border-radius: 10px;
  h1 {
    font-family: 'Pacifico', cursive;
    font-size: 200%;
    font-weight: bold;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px 0;
`;

const Label = styled.label`
  width: 40%;
`;

const Input = styled.input`
  width: 60%;
  background-color: #f5f5f5;
  border-radius: 3px;
  padding: 8px;
  outline: none;
  font-size: 80%;
  font-family: inherit;
  &:hover {
    border: 1px solid cornflowerblue;
  }
`;

const Validation = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div {
    display: none;
    color: red;
  }
`;

const Submit = styled.button`
  width: 100%;
  font-size: 110%;
  padding: 8px;
  background-color: #3cb371;
  color: white;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    border: 1px solid #98fb98;
    color: #98fb98;
  }
  &:active {
    background-color: #2e8b57;
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const SignIn = ({ setHeaderDisplay }) => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [match, setMatchStatus] = useState(true);
  const [emptyValues, setValueStatus] = useState(false);
  const { push } = useHistory();

  useEffect(() => {
    setHeaderDisplay(false);
  }, [setHeaderDisplay]);

  const handleSubmit = evt => {
    evt.preventDefault();
    let emptyInputs = false;
    Object.values(values).forEach(value => {
      if (value === '') {
        emptyInputs = true;
      }
    });
    if (emptyInputs) {
      setValueStatus(true);
    } else {
      axios
        .post('https://medcabinet1.herokuapp.com/api/auth/login', values)
        .then(response => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('CUSER', response.config.data);

          push('/profile/findmore');
          console.log(response.config.data);
          setMatchStatus(true);
          setValueStatus(false);
          setHeaderDisplay(true);
        })
        .catch(err => {
          console.log(err);
          setMatchStatus(false);
          setValueStatus(true);
        });
    }
  };
  const handleChange = evt => {
    evt.preventDefault();
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
    setValueStatus(false);
    console.log(values);
  };

  return (
    <Container>
      <LoginWindow>
        <Heading>
          <ReactSVG src='flask-lg.svg' />
          <h1>Dr. Mary Jane</h1>
        </Heading>
        <h2 style={{ fontSize: '120%', fontWeight: 'bold', marginTop: '10px' }}>
          Log In
        </h2>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Label htmlFor='username'>Username</Label>
            <Input
              type='text'
              id='username'
              name='username'
              style={
                emptyValues
                  ? { border: '1px solid red' }
                  : { border: '1px solid lightgray' }
              }
              value={values.username}
              onChange={handleChange}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              id='password'
              name='password'
              style={
                emptyValues
                  ? { border: '1px solid red' }
                  : { border: '1px solid lightgray' }
              }
              value={values.password}
              onChange={handleChange}
            />
          </InputContainer>
          <Validation>
            <div style={match ? { display: 'none' } : { display: 'block' }}>
              Could not find user
            </div>
          </Validation>
          <Submit type='submit'>Log In</Submit>
        </form>
        <NavLink style={{ marginTop: '10px' }} to='/signup'>
          Don't have an account? Sign up here!
        </NavLink>
      </LoginWindow>
    </Container>
  );
};

export default SignIn;
