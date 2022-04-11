import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import AllEmployee from "./pages/AllEmployee";
import NewEmployee from "./pages/NewEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import RequireAuth from "./pages/RequireAuth";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="login" element={<Auth />} />
        <Route path="forgot-password" element={<ForgotPassword />} />

        {/* RequireAuth components behaves like a route guard */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AllEmployee />} />
          <Route path="new-employee" element={<NewEmployee />} />
          <Route path="update-employee" element={<UpdateEmployee />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
