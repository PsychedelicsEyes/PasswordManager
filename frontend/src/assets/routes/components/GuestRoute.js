import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children, redirectTo }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to={redirectTo} replace /> : children;
};

export default GuestRoute;
