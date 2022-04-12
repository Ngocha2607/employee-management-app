import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../store/reducers/user-slice";
import { Form, Input, Button, Modal, Alert } from "antd";

const AuthForm = () => {

  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState();
  const [userInfor, setUserInfo] = useState();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // Fetching user data
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAirGdnEkhcUBYEtFYzq5n2-p5HSiKHaJg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setUserInfo("Hi, " + data.users[0].email);
      });
  }, [token]);

  const submitHandler = (value) => {
    const enteredEmail = value.Email;
    const enteredPassword = value.password;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAirGdnEkhcUBYEtFYzq5n2-p5HSiKHaJg";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAirGdnEkhcUBYEtFYzq5n2-p5HSiKHaJg";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Email or Password incorrect. Please try again!");
        }
      })
      .then((data) => {
        dispatch(login(data.idToken));
        navigate("/");
      })
      .catch((err) => {
        setAuthError(err.message);
      });
  };

  return (
      <Modal
        visible={true}
        footer={null}
        closable={false}
      >
        <section>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>

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
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password ref={passwordInputRef} placeholder="********" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              {!isLoading && (
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  size="large"
                >
                  {isLogin ? "Login" : "Create Account"}
                </Button>
              )}
              {isLoading && <p>Sending request...</p>}
            </Form.Item>
            <Form.Item>
              <Button type="link" onClick={switchAuthModeHandler}>
                {isLogin ? "Create New Account?" : "Existing Account?"}
              </Button>

              <Button type="link">
                <NavLink to="/forgot-password">Forgot Password?</NavLink>
              </Button>
            </Form.Item>
          </Form>
        </section>
      </Modal>
  );
};

export default AuthForm;
