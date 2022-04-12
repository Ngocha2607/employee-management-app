import React, { useRef, useState } from "react";
import classes from "./EmployeeItemForm.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployeeToList } from "../../../store/reducers/employee-slice";
import { Form, Input, InputNumber, Button, DatePicker } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
    birthdate:  'Please select time!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const EmployeeItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputAgeRef = useRef();
  const inputPhoneRef = useRef();
  const inputDoBRef = useRef();

  const cancelHandler = () => {
    navigate("/");
  };

  const submitHandler = (value) => {
    const enteredName = value.employee.name;
    const enteredPhone = value.employee.phone;
    const enteredDoB = value.employee.birthdate;
    const enteredEmail = value.employee.email;
    const enteredAge = value.employee.age;

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

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={submitHandler}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["employee", "name"]}
        label="Name"
        rules={[{ required: true }]}
      >
        <Input ref={inputNameRef} />
      </Form.Item>
      <Form.Item
        name={["employee", "email"]}
        label="Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input ref={inputEmailRef} />
      </Form.Item>
      <Form.Item
        name={["employee", "age"]}
        label="Age"
        rules={[{ required: true, type: "number", min: 0, max: 99 }]}
      >
        <InputNumber ref={inputAgeRef} />
      </Form.Item>
      <Form.Item name={["employee", "phone"]} label="Phone Number" rules={[{ required: true }]}>
        <Input ref={inputPhoneRef} />
      </Form.Item>
      <Form.Item name={["employee", "birthdate"]} label="BirthDate" rules={[{ required: true}]}>
        <Input ref={inputDoBRef} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" onClick={cancelHandler}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeItemForm;
