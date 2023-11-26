import { Outlet } from "react-router-dom";

const ManageContent = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <Outlet />
      </div>
    </>
  );
};

export default ManageContent;
