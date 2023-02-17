//REGISTRATION PAGE FRONTEND CODE
import { React, useRef } from "react";
import axios from "axios";
import "./register.css"

import { useNavigate } from 'react-router-dom';

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password1 = useRef();
  const password2 = useRef();
  const age = useRef();

  const navigate = useNavigate();

  const handleRegisterClick = async (e) => {
    e.preventDefault();

  
    if (password2.current.value !== password1.current.value) { 
      password2.current.setCustomValidity("Passwords don't match!"); // u can set your own error messages using custom validity
    } else {
      
        const user = {
        username: username.current.value,
        email: email.current.value,
        password: password1.current.value,
        age: age.current.value
      };
      console.log('user', user)
      try {
        await axios.post("/auth/register", user);
        navigate('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const loginRedirect = () => {
    navigate('/login');
	};

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Mood Palette</h3>
          <span className="registerDesc">
          Track your mood, write diary entries, customize your Moo Pal, and get a personalized song everyday!
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleRegisterClick}>
            <input placeholder="Username"  ref = {username} className="registerInput" />
            <input placeholder="Email"  ref={email}c type="email" className="registerInput" />
            <input placeholder="Password"  ref={password1} type="password" className="registerInput" />
            <input placeholder="Retype Password"  ref={password2} type="password" className="registerInput" />
            <input placeholder="Age"  ref={age} className="registerInput" />
            <button className="registerButton" type="submit">Sign Up</button>
            
            <button className="loginRegisterButton" onClick={loginRedirect}>
              Log into Account
            </button>
          </form>
         
        </div>
      </div>
    </div>
  );
}

