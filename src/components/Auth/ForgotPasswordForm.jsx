import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isShowLogin } from "../../store/reducers/ui-slice";
import { Form, Input, Button, Modal, Alert } from "antd";

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

    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAirGdnEkhcUBYEtFYzq5n2-p5HSiKHaJg",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          let errorMessage = "Incorrect Email. Please try again!";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        navigate("/");
      })
      .catch((err) => {
        setAuthError(err.message);
      });
  };

  return (
    <Modal visible={true} footer={null} closable={false}>
      <section>
        <h1>Forgot Password</h1>

        {authError && (
          <Alert
          message="Error"
          description={authError}
          type="error"
          showIcon
          closable
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
      </section>
    </Modal>
  );
};

export default ForgotPasswordForm;
