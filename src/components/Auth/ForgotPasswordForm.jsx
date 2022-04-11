import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import classes from "./AuthForm.module.css";
import { isShowLogin } from "../../store/reducers/ui-slice";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const closeForgotPassword = () => {
    dispatch(isShowLogin());
    navigate("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAirGdnEkhcUBYEtFYzq5n2-p5HSiKHaJg",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Modal onCancel={closeForgotPassword}>
      <section className={classes.auth}>
        <h1>Forgot Password</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.actions}>
            {!isLoading && (
              <>
                <button
                  className={classes.cancelBtn}
                  onClick={closeForgotPassword}
                >
                  Cancel
                </button>
                <button>Send Email</button>
              </>
            )}
            {isLoading && <p>Sending request...</p>}
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default ForgotPasswordForm;
