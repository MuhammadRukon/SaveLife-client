import React from "react";
import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <div className="text-center text-xl font-semibold">
      Welcome {user.displayName} !
    </div>
    // three recent request
  );
};

export default DashboardHome;
