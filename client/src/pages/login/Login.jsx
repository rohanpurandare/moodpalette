//LOGIN PAGE FRONTEND CODE
import { React, useRef } from "react";
import "./login.css"
import { loginCall } from "../../attemptLogin";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { CircularProgress } from "@material-ui/core";

export default function Login() {

  //*Note: we could also use state but since this refreshes with each letter,, better to use reference
  const username = useRef(); // useRef will auto update this value with whatever user types in form immediately
  const password = useRef(); // just say ref={varName} with associated form input

  const {user, isFetching, dispatch} = useContext(AuthContext) // use the auth context to get this info

  // method for when user clicks login button
  const handleLoginSubmit = (e) => {
    e.preventDefault(); // stops page from refreshing on button click
    //username.current.value holds whatever user submitted as username
    //password.current.value holds whatever user submitted as password
    console.log("username", username.current.value);
    console.log("password", password.current.value);

    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    );
  }


    console.log("user", user);

    // page
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Mood Palette</h3>
            <span className="loginDesc">
            Track your mood, write diary entries, customize your Moo Pal, and get a personalized song everyday!
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit = {handleLoginSubmit}>
              <input placeholder="Username" className="loginInput" ref={username} required/> 
              <input placeholder="Password" type="password" className="loginInput" ref={password} required/>
              <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress size="20px" />
              ) : (
                "Log In"
              )}
            </button>
              <span className="loginForgot">Forgot Password?</span>
              <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
            </form>
          </div>
        </div>
      </div>
    );
  }