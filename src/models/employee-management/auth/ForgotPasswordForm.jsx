import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isShowLogin } from "../../../store/reducers/ui-slice";
import axios from "axios";
import { Form, Input, Button, Modal, Alert, Divider, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState();

  const closeForgotPassword = () => {
    dispatch(isShowLogin());
    navigate("/");
  };

  const submitHandler = (value) => {
    const enteredEmail = value.Email;
    setAuthError(false);
    setIsLoading(true);

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAirGdnEkhcUBYEtFYzq5n2-p5HSiKHaJg",
        {
          email: enteredEmail,
          requestType: "PASSWORD_RESET",
        }
      )

      .then(() => {
        setIsLoading(false);
        navigate("/");
        notification.open({
          message: "Notification",
          description: "Please, checking your email!",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setAuthError("Incorrect Email. Please try again!");
      });
  };

  return (
    <Modal visible={true} footer={null} closable={false}>
      <Divider>
        <h1>Forgot Password</h1>
      </Divider>

      {authError && (
        <Alert
          message="Error"
          description={authError}
          type="error"
          showIcon
          closable
          style={{ marginBottom: "1rem" }}
        />
      )}

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
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input ref={emailInputRef} placeholder="name@gmail.com" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {!isLoading && (
            <>
              <Button
                type="danger"
                shape="round"
                size="large"
                onClick={closeForgotPassword}
                style={{ marginRight: "1rem" }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                size="large"
              >
                Send Email
              </Button>
            </>
          )}
          {isLoading && <p>Sending request...</p>}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordForm;
