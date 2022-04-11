import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
      // Go back to the login pages if not login
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
