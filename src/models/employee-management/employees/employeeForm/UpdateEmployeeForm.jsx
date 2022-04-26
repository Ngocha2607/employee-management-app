import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployeeInList } from "../../../../store/reducers/employee-slice";
import { Form, Input, Button, Divider, Card } from "antd";

const UpdateEmployeeForm = (props) => {
  const employeeUpdate = useSelector((state) =>
    state.employee.employees.find(
      (employee) => employee.userKey === props.userKey
    )
  );
  const dispatch = useDispatch();

  const inputNameRef = useRef();
  const inputPhoneRef = useRef();
  const inputDoBRef = useRef();
  const inputEmailRef = useRef();

  const submitHandler = (value) => {
    const enteredName = value.name;
    const enteredPhone = value.phone;
    const enteredDoB = value.birthdate;
    const enteredEmail = value.email;

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
  };

  return (
    <Card
      style={{
        border: "none",
      }}
    >
      <Divider>
        <h1>Update Employee</h1>
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
          initialValue={employeeUpdate.name}
        >
          <Input ref={inputNameRef} />
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
          initialValue={employeeUpdate.phone}
        >
          <Input ref={inputPhoneRef} />
        </Form.Item>

        <Form.Item
          name="birthdate"
          label="BirthDate"
          rules={[{ required: true, message: "Please pick the date!" }]}
          initialValue={employeeUpdate.dob}
        >
          <Input ref={inputDoBRef} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input employee email!" }]}
          initialValue={employeeUpdate.email}
        >
          <Input ref={inputEmailRef} />
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
            onClick={props.onCancel}
            style={{ marginRight: "1rem" }}
          >
            Cancel
          </Button>

          <Button type="primary" htmlType="submit" shape="round" size="large">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UpdateEmployeeForm;
