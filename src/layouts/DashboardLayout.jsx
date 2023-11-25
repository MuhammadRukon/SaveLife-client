import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* Sidebar Component */}
      <Sidebar />
      <div className="flex-1 md:ml-64">
        {/* Outlet for dynamic contents */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
