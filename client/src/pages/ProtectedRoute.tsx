import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const ProtectedRoute: React.FC = () => {
  const login = isLoggedIn();
  const location = useLocation();

  if (!login) {
    return <Navigate to={"/auth"} state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
