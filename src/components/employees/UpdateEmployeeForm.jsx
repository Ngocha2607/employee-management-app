import React, { useRef, useState } from "react";
import classes from "./EmployeeItemForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployeeInList } from "../../store/reducers/employee-slice";
import { toggle } from "../../store/reducers/ui-slice";

const isEmpty = (value) => value.trim() === "";

const UpdateEmployeeForm = (props) => {
  const employeeUpdate = useSelector((state) =>
    state.employee.employees.find(
      (employee) => employee.userKey === props.userKey
    )
  );
  const dispatch = useDispatch();
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

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = inputNameRef.current.value;
    const enteredPhone = inputPhoneRef.current.value;
    const enteredDoB = inputDoBRef.current.value;
    const enteredEmail = inputEmailRef.current.value;

    const enteredNameIsValue = !isEmpty(enteredName);
    const enteredPhoneIsValue = !isEmpty(enteredPhone);
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
      updateEmployeeInList({
        userKey: props.userKey,
        id: enteredPhone,
        name: enteredName,
        phone: enteredPhone,
        dob: enteredDoB,
        email: enteredEmail,
      })
    );

    props.setShowUpdate(false);
    dispatch(toggle());
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
          <input
            type="text"
            id="name"
            ref={inputNameRef}
            defaultValue={employeeUpdate.name}
          />
          {!formInputValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={phoneControlClasses}>
          <label htmlFor="phone">Phone number</label>
          <input
            type="text"
            id="phone"
            ref={inputPhoneRef}
            defaultValue={employeeUpdate.phone}
          />
          {!formInputValidity.phone && (
            <p>Please enter a valid phone number!</p>
          )}
        </div>
        <div className={dobControlClasses}>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            ref={inputDoBRef}
            defaultValue={employeeUpdate.dob}
          />
          {!formInputValidity.dob && <p>Please enter a valid date!</p>}
        </div>
        <div className={emailControlClasses}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            ref={inputEmailRef}
            defaultValue={employeeUpdate.email}
          />
          {!formInputValidity.email && <p>Please enter a valid email!</p>}
        </div>

        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Update</button>
        </div>
      </div>
    </form>
  );
};

export default UpdateEmployeeForm;
