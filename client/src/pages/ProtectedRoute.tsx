import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  // if (!isLoggedIn) {
  //   return <Navigate to={"/auth"} replace />;
  // }
  return <Outlet />;
};

export default ProtectedRoute;
