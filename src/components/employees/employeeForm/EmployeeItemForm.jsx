import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployeeToList } from "../../../store/reducers/employee-slice";
import { Form, Input, Button, Divider, Card } from "antd";

const EmployeeItemForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPhoneRef = useRef();
  const inputDoBRef = useRef();

  const cancelHandler = () => {
    navigate("/");
  };

  const submitHandler = (value) => {
    const enteredName = value.name;
    const enteredPhone = value.phone;
    const enteredDoB = value.birthdate;
    const enteredEmail = value.email;

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
    <Card style={{
      margin: '0 auto',
      boxShadow: '0px 1px 4px 1px rgb(0 0 0 / 20%)',
      width: '80%',
      maxWidth: '40rem',
      background: '#d0eaf7'
    }}>
      <Divider>
        <h1>New Employee</h1>
      </Divider>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={submitHandler}
        autoComplete="on"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input employee name!",
            },
          ]}
        >
          <Input ref={inputNameRef} placeholder="Nguyen Van A" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input employee phone number!",
            },
          ]}
        >
          <Input ref={inputPhoneRef} placeholder="0987654321" />
        </Form.Item>

        <Form.Item
          name="birthdate"
          label="BirthDate"
          rules={[{ required: true, message: "Please pick the date!" }]}
        >
          <Input ref={inputDoBRef} placeholder="01-01-2000" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input employee email!" }]}
        >
          <Input ref={inputEmailRef} placeholder="name@gmail.com" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="danger"
            shape="round"
            size="large"
            onClick={cancelHandler}
            style={{marginRight: "1rem"}}
          >
            Cancel
          </Button>

          <Button type="primary" htmlType="submit" shape="round" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EmployeeItemForm;
