import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeEmployeeFromList } from "../../../store/reducers/employee-slice";
import classes from "./EmployeeItem.module.css";
import UpdateEmployee from "../../../pages/UpdateEmployee";

const EmployeeItem = (props) => {
  const dispatch = useDispatch();

  const [showUpdate, setShowUpdate] = useState(false);

  const showUpdateHandler = () => {
    setShowUpdate(true);
  };

  const cancelUpdateHandler = () => {
    setShowUpdate(false);
  };

  const removeEmployeeHandler = () => {
    dispatch(removeEmployeeFromList(props.userKey));
  };

  return (
    <li>
      <div className={classes.employee}>
        <h3>{props.name}</h3>
        <div className={classes.phone}>{props.phone}</div>
        <div className={classes.dob}>{props.dob}</div>
        <div className={classes.email}>{props.email}</div>
        <div className={classes.edits}>
          <button onClick={showUpdateHandler}>Update</button>
        </div>
        <span className={classes.delete} onClick={removeEmployeeHandler}>
          x
        </span>
      </div>
      {showUpdate && (
        <div>
          <UpdateEmployee
            userKey={props.userKey}
            onCancel={cancelUpdateHandler}
            setShowUpdate={setShowUpdate}
          />
        </div>
      )}
    </li>
  );
};

export default EmployeeItem;
