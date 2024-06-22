import Navbar from "../components/Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to="/c/all" />;
  }

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
