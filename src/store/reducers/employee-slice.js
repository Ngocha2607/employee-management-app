import { createSlice } from "@reduxjs/toolkit";
import {
  addEmployeeHandler,
  removeEmployeeHandler,
  updateEmployeeHandler,
} from "../../components/firebase_api/api";

const initialState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    replaceData: (state, action) => {
      state.employees = action.payload;
    },

    addEmployeeToList: (state, action) => {
      const newEmployee = action.payload;
      const existingEmployee = state.employees.find(
        (employee) => employee.id === newEmployee.id
      );

      if (!existingEmployee) {
        state.employees.push({
          id: newEmployee.id,
          name: newEmployee.name,
          phone: newEmployee.phone,
          dob: newEmployee.dob,
          email: newEmployee.email,
        });
        addEmployeeHandler(newEmployee);
      } else {
        alert("This employee already exists!");
      }
    },

    removeEmployeeFromList: (state, action) => {
      const userKey = action.payload;
      const existingEmployee = state.employees.find(
        (employee) => employee.userKey === userKey
      );

      if (existingEmployee) {
        state.employees = state.employees.filter(
          (employee) => employee.userKey !== userKey
        );
        removeEmployeeHandler(existingEmployee.userKey);
      } else {
        alert("This employee is not available");
      }
    },

    updateEmployeeInList: (state, action) => {
      const newEmployeeDetail = action.payload;
      const existingEmployee = state.employees.find(
        (employee) => employee.userKey === newEmployeeDetail.userKey
      );

      if (existingEmployee) {
        existingEmployee.id = newEmployeeDetail.id;
        existingEmployee.name = newEmployeeDetail.name;
        existingEmployee.phone = newEmployeeDetail.phone;
        existingEmployee.dob = newEmployeeDetail.dob;
        existingEmployee.email = newEmployeeDetail.email;

        updateEmployeeHandler(existingEmployee.userKey, existingEmployee);
      } else {
        alert("This employee is not available");
      }
    },
  },
});

export const {
  replaceData,
  addEmployeeToList,
  removeEmployeeFromList,
  updateEmployeeInList,
} = employeeSlice.actions;

export default employeeSlice.reducer;
