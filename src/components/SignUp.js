import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

const Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#98FB98;
`;

const SignUpPanel = styled.div`
    border: 1px solid #F5F5F5;
    border-radius: 5px;
    width: 25%;
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
    background-color:#3cb371;
    color:white;
    fill:white;
    padding:10px;
    border-radius:10px;
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
    margin: 10px 0;
`;

const Label = styled.label`
    width: 30%;
`;

const Input = styled.input`
    width: 70%;
    background-color: #F5F5F5;
    border-radius: 8px;
    padding: 8px;
    outline: none;
    font-size: 80%;
    font-family: inherit;
    border: 1px solid white;
    &: hover {
        border: 1px solid cornflowerblue;
    }
`;

const Button = styled.button`
width:100%;
    font-size: 110%;
    margin-top: 20px;
    padding: 8px;
    background-color: #3CB371;
    border: 1px solid white;
    color: white;
    border-radius: 5px;
    &: hover {
        cursor: pointer;
        border: 1px solid #98FB98;
        color: #98FB98;
    }
    &: active {
        background-color: #2E8B57;
        outline: none;
    }
    &: focus {
        outline: none;
    }
`;

const SignUp = props => {
    const [newUser, setNewUser] = useState ({
        username: '',
        password: '',
        email: ''
    });
    const [emptyValues, setValueStatus] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        let emptyInputs = false;
        Object.values(newUser).forEach(value => {
            if (value === "") {
                emptyInputs = true;
            }
        })

        if (emptyInputs) {
            setValueStatus(true);
        } else {
            axios.post("https://medcabinet1.herokuapp.com/api/auth/register", newUser)
            .then(response =>{
                      localStorage.setItem("token", response.data.token);
                      localStorage.setItem("user_id", response.data.id);
                      localStorage.setItem("email", response.data.email);
                      props.history.push("/dashboard")
                      console.log(response.data)
            })

            .catch(error => {
                console.log(error);
                setValueStatus(true);
            })
        }
    }

    const handleChanges = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
        setValueStatus(false);
    };

    return (
        <Background>
            <SignUpPanel>
                <Heading>
                    <ReactSVG src='flask-lg.svg' />
                    <h1>Dr. Mary Jane</h1>
                </Heading>
                <h2 style={{fontSize: "120%", fontWeight: "bold", marginTop: "10px"}}>Sign Up</h2>
               
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            required
                            id='username'
                            type='text'
                            name='username'
                            style={emptyValues ? {border: "1px solid red"} : {border: "1px solid white"}}
                            onChange={handleChanges}
                            value={newUser.name}
                        />
                    </InputContainer>
                    
                    <InputContainer>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            required
                            id='password'
                            type='password'
                            name='password'
                            style={emptyValues ? {border: "1px solid red"} : {border: "1px solid white"}}
                            onChange={handleChanges}
                            value={newUser.password}
                        />
                    </InputContainer>
                    
                    <InputContainer>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='email'
                            name='email'
                            onChange={handleChanges}
                            value={newUser.email}
                        />
                    </InputContainer>
                    
                    <Button type='submit'>Sign Up</Button>
                </form>

                <Link to='/'>Have an account? Sign in here.</Link>
            </SignUpPanel>
        </Background>
    )
}

export default SignUp;