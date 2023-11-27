import React from "react";
import useAuth from "../../hooks/useAuth";
import DonorHomePage from "./homepage/DonorHomePage";
import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const { user } = useAuth();
  const [role] = useRole();
  return (
    <>
      <div className="text-center text-2xl sm:text-3xl lg:text-4xl mt-14 lg:mt-20 font-semibold">
        Welcome {user.displayName} !
      </div>
      {role === "donor" && <DonorHomePage />}
    </>
  );
};

export default DashboardHome;
