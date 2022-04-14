import React from "react";
import classes from "./Layout.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/user-slice";

import { Layout, Menu, Button } from "antd";

const { Header } = Layout;

const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Layout>
      <Header className={classes.header}>
        <div className={classes.logo}>3S</div>
        {isLoggedIn && (
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <NavLink to="/">All Employees</NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="new-employee">Add a Employee</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={logoutHandler}
              >
                Sign Out
              </Button>
            </Menu.Item>
          </Menu>
        )}
      </Header>
    </Layout>
  );
};

export default MainNavigation;
