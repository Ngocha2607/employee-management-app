import React, { useState, useEffect } from "react";
import EmployeeItem from "./EmployeeItem";
import Card from "../UI/Card";
import EmployeesManagement from "../../assets/EmployeesManagement.jpg";

import classes from "./ListEmployee.module.css";
import { useDispatch, useSelector } from "react-redux";
import { replaceData } from "../../store/reducers/employee-slice";

const ListEmployee = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(
        "https://my-employees-management-f01ab-default-rtdb.firebaseio.com/employees.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      const loadedEmployees = [];

      for (const key in responseData) {
        loadedEmployees.push({
          userKey: key,
          id: responseData[key].id,
          name: responseData[key].name,
          phone: responseData[key].phone,
          dob: responseData[key].dob,
          email: responseData[key].email,
        });
      }
      dispatch(replaceData(loadedEmployees));
      setIsLoading(false);
    };
    fetchEmployees().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <section className={classes.employeesLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.employeesError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const employeesList = employees.map((employee) => (
    <EmployeeItem
      key={employee.userKey}
      userKey={employee.userKey}
      id={employee.id}
      name={employee.name}
      phone={employee.phone}
      dob={employee.dob}
      email={employee.email}
    />
  ));

  return (
    <>
      <section className={classes.employees}>
        {isLoggedIn && (
          <Card>
            <div className={classes.employeesHeader}>
              <ul>
                <li>Name</li>
                <li>Phone</li>
                <li>Date of Birth</li>
                <li>Email</li>
                <li>Action</li>
              </ul>
            </div>
            {employees.length ? (
              <ul>{employeesList}</ul>
            ) : (
              <p>No employees available!</p>
            )}
          </Card>
        )}
      </section>
      {!isLoggedIn && (
        <div className={classes.imgBackground}>
          <img src={EmployeesManagement} alt="Employees Management App" />
        </div>
      )}
    </>
  );
};

export default ListEmployee;
