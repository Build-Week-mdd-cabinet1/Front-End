import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ReactSVG} from 'react-svg';
import styled from 'styled-components';

const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#98FB98;
`

const LoginWindow = styled.div`
    border:1px solid #F5F5F5;
    border-radius:5px;
    width:25%;
    min-width:300px;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:white;
    padding:20px;
    & form {
        width:100%;
    }
`

const Heading = styled.div`
    display:flex;
    justify-content:center;
    align-items:baseline; 
    font-size:200%;
    font-weight:bold;
`

const InputContainer = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    margin: 5px 0;
`

const Label = styled.label`
    width:40%;
`

const Input = styled.input`
    width:60%;
    background-color:#F5F5F5;
    border-radius:3px;
    padding:8px;
    outline:none;
    font-size:80%;
    font-family:inherit;
    border:1px solid white;
    &:hover {
        border:1px solid cornflowerblue;
    }
`

const Validation = styled.div`
    width:100%;
    height:25px;
    display:flex;
    flex-direction:column;
    align-items:center;
    & > div {
        display:none;
        color:red;
    }
`

const Submit = styled.button`
    width:100%;
    font-size:110%;
    padding:8px;
    background-color:#3CB371;
    color:white;
    border-radius:5px;
    &:hover {
        cursor:pointer;
        border:1px solid #98FB98;
        color:#98FB98;
    }
    &:active {
        background-color:#2E8B57;
        outline:none;
    }
    &:focus {
        outline:none;
    }
`

const LoginPage = () => {
    const [userInfo, updateUserInfo] = useState({
        "username": "",
        "password": "",
    })
    const [match, setMatchStatus] = useState(true);
    const [emptyValues, setValueStatus] = useState(false);

    console.log(localStorage.getItem("token"));

    const handleSubmit = event => {
        event.preventDefault();
        let emptyInputs = false;
        Object.values(userInfo).forEach(value => {
            if (value === "") {
                emptyInputs = true;
            }
        })
        if (emptyInputs) {
            setValueStatus(true);
        }
        else {
            axios.post("https://medcabinet1.herokuapp.com/api/auth/login", userInfo)
            .then(response => {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                setMatchStatus(true);
                setValueStatus(false);
            })
            .catch(error => {
                console.log(error);
                setMatchStatus(false);
                setValueStatus(true);
            })
        }
    }

    const handleChange = event => {
        updateUserInfo({ ...userInfo, [event.target.name]: event.target.value });
        setValueStatus(false);
    }

    return (
        <Container>
            <LoginWindow>
                <Heading><ReactSVG src="flask.svg"/><h1>Login</h1></Heading>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" name="username" style={emptyValues ? {border: "1px solid red"} : {border: "1px solid white"}} value={userInfo.username} onChange={handleChange}/>
                    </InputContainer>
                    <InputContainer>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" style={emptyValues ? {border: "1px solid red"} : {border: "1px solid white"}} value={userInfo.password} onChange={handleChange}/>
                    </InputContainer>
                    <Validation>
                        <div style={match ? {display:"none"} : {display:"block"}}>Could not find user</div>
                    </Validation>
                    <Submit type="submit">Log In</Submit>
                </form>
            </LoginWindow>
        </Container>
    )
}

export default LoginPage;