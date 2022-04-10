import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../store/reducers/user-slice";
import Modal from "../UI/Modal";
import classes from "./AuthForm.module.css";
import { isShowLogin } from "../../store/reducers/ui-slice";

const AuthForm = () => {
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const closeLogin = () => {
    dispatch(isShowLogin());
    navigate("/");
  };

  useEffect(() => {
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAirGdnEkhcUBYEtFYzq5n2-p5HSiKHaJg', {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          let errorMessage = "User not found!";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
       alert('Hi, ' + data.users[0].email);
      })
      .catch((err) => {
        //alert(err.message);
      });
  }, [token])

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAirGdnEkhcUBYEtFYzq5n2-p5HSiKHaJg";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAirGdnEkhcUBYEtFYzq5n2-p5HSiKHaJg";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          let errorMessage = "Authentication failed!";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        dispatch(login(data.idToken));
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Modal onCancel={closeLogin}>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>Sending request...</p>}
          </div>
          <div className={classes.actions}>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          <button className={classes.toggle}>
            <NavLink to='/forgot-password'>Forgot Password?</NavLink>
          </button>
          </div>
        </form>
    
      
      </section>
    </Modal>
  );
};

export default AuthForm;
