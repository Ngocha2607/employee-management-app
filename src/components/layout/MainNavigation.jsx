import React from "react";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isShowLogin } from "../../store/reducers/ui-slice";
import { logout } from "../../store/reducers/user-slice";

const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const showLogin = () => {
    dispatch(isShowLogin());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>3S</div>
      <nav className={classes.nav}>
        {!isLoggedIn && (
          <div className={classes.login}>
            <button onClick={showLogin}>
              <NavLink to="auth">Sign In</NavLink>
            </button>
          </div>
        )}
        {isLoggedIn && (
          <ul>
            <li>
              <NavLink to="/" className={classes.active}>
                All Employees
              </NavLink>
            </li>
            <li>
              <NavLink to="new-employee" className={classes.active}>
                Add a Employee
              </NavLink>
            </li>
            <li>
              <div className={classes.logout}>
                <button onClick={logoutHandler}>Sign Out</button>
              </div>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
