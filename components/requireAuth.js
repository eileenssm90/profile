import React from "react";
import { auth } from "../firebase.js";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, isAuth }) => {
  if (!isAuth) {
    console.log(isAuth);
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
