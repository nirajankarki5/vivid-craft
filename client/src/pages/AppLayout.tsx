import Navbar from "../components/Navbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AppLayout: React.FC = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to="/c/all" />;
  }

  return (
    <div className="font-body">
      <Navbar />
      <main className="mt-[5rem] sm:mt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
