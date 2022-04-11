import React from "react";
import UpdateEmployeeForm from '../components/employees/employeeForm/UpdateEmployeeForm';

const UpdateEmployee = (props) => {
  return (
    <UpdateEmployeeForm
      userKey={props.userKey}
      onCancel={props.onCancel}
      setShowUpdate={props.setShowUpdate}
    />
  );
};

export default UpdateEmployee;
