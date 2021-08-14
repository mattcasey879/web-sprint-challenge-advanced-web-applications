import React, { useState, } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../helpers/axiosWithAuth";

const initalCredentials = {
  username: '',
  password: ''
}

const Login = (props) => {
  const { push } = useHistory();
  const [cred, setCred] = useState(initalCredentials)
  const [error, setError] = useState(false)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const errorMsg = "Username or password not valid";
  //replace with error state

  const handleChange = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    axiosWithAuth()
    .post('/login', cred)
    .then(res => {
      console.log(res.data.payload)
      localStorage.setItem('token', res.data.payload)
      push('/colors/1')
      setError(false)
    })
    .catch(err => 
      {console.log(err) 
      setError(true)})
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleLogin}>
          <label htmlFor='username'>
            <input type='text' placeholder='username' id='username' name='username' value={cred.username} onChange={handleChange}></input>
          </label>
          <label htmlFor='password'>
          <input type='password' placeholder='password' id='password' name='password' value={cred.password} onChange={handleChange}></input>
          </label>
          <button id='submit'>Submit</button>
        </form>
      </div>

      {error && <p id="error" className="error">{errorMsg}</p>}
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"