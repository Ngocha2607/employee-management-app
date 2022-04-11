import React, { useRef, useState } from "react";
import classes from "./EmployeeItemForm.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployeeToList } from "../../../store/reducers/employee-slice";

const isEmpty = (value) => value.trim() === "";
const isPhoneNumber = (phoneNumber) => phoneNumber.trim().length === 10;

const EmployeeItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    phone: true,
    dob: true,
    email: true,
  });

  const inputNameRef = useRef();
  const inputPhoneRef = useRef();
  const inputDoBRef = useRef();
  const inputEmailRef = useRef();

  const cancelHandler = () => {
    navigate("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = inputNameRef.current.value;
    const enteredPhone = inputPhoneRef.current.value;
    const enteredDoB = inputDoBRef.current.value;
    const enteredEmail = inputEmailRef.current.value;

    const enteredNameIsValue = !isEmpty(enteredName);
    const enteredPhoneIsValue = isPhoneNumber(enteredPhone);
    const enteredDoBIsValue = !isEmpty(enteredDoB);
    const enteredEmailIsValue = !isEmpty(enteredEmail);

    setFormInputValidity({
      name: enteredNameIsValue,
      phone: enteredPhoneIsValue,
      dob: enteredDoBIsValue,
      email: enteredEmailIsValue,
    });

    const formIsValid =
      enteredNameIsValue &&
      enteredPhoneIsValue &&
      enteredDoBIsValue &&
      enteredEmailIsValue;

    if (!formIsValid) {
      return;
    }

    dispatch(
      addEmployeeToList({
        id: enteredPhone,
        name: enteredName,
        phone: enteredPhone,
        dob: enteredDoB,
        email: enteredEmail,
      })
    );

    navigate("/");
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const phoneControlClasses = `${classes.control} ${
    formInputValidity.phone ? "" : classes.invalid
  }`;
  const dobControlClasses = `${classes.control} ${
    formInputValidity.dob ? "" : classes.invalid
  }`;
  const emailControlClasses = `${classes.control} ${
    formInputValidity.email ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["new-form"]}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Employee Name</label>
          <input type="text" id="name" ref={inputNameRef} />
          {!formInputValidity.name && (
            <p className={classes.invalidationText}>
              Please enter a valid name!
            </p>
          )}
        </div>
        <div className={phoneControlClasses}>
          <label htmlFor="phone">Phone number</label>
          <input type="text" id="phone" ref={inputPhoneRef} />
          {!formInputValidity.phone && (
            <p className={classes.invalidationText}>
              Phone number must contain 10 numbers!
            </p>
          )}
        </div>
        <div className={dobControlClasses}>
          <label htmlFor="dob">Date of Birth</label>
          <input type="date" id="dob" ref={inputDoBRef} />
          {!formInputValidity.dob && (
            <p className={classes.invalidationText}>
              Please enter a valid date!
            </p>
          )}
        </div>
        <div className={emailControlClasses}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={inputEmailRef} />
          {!formInputValidity.email && (
            <p className={classes.invalidationText}>
              Please enter a valid email!
            </p>
          )}
        </div>

        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default EmployeeItemForm;
