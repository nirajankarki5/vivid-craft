import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="font-body">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
