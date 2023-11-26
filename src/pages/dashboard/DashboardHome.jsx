import React from "react";
import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();
  return (
    <div className="text-center text-2xl sm:text-3xl lg:text-4xl mt-14 lg:mt-20 font-semibold">
      Welcome {user.displayName} !
    </div>
    // three recent request
  );
};

export default DashboardHome;
