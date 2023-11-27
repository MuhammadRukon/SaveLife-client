import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosSecure from "../../api";
import useAuth from "../../hooks/useAuth";

import useRole from "../../hooks/useRole";
import UpdateUserModal from "../../components/Modal/UpdateUserModal";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role] = useRole();
  const { data, isLoading, refetch } = useQuery({
    enabled: !loading,
    queryKey: ["profile"],
    queryFn: async () => await axiosSecure(`/user/role/${user?.email}`),
  });
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl w-3/5">
        <img
          alt="profile"
          src="https://i.ibb.co/XLyQqnS/360-F-137309034-4o-K5-Bo-Yq-Uc7s-Uo-Nor1lt-GW0-PAYNz-Ex-K9.jpg"
          className="w-full mb-4 rounded-t-lg h-36 object-cover"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-primary rounded-full">
            {role && role.toUpperCase()}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            Name: {user.displayName}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-col lg:flex-row items-start flex-wrap gap-3  lg:items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user.email}</span>
              </p>
              <p className="flex flex-col">
                Location
                <span className="font-bold text-black ">
                  {data?.data?.district}, {data?.data?.upazila}
                </span>
              </p>
              <p className="flex flex-col">
                Blood Group
                <span className="font-bold text-black ">
                  {data?.data?.bloodGroup}
                </span>
              </p>
              <div>
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-primary px-10 py-2 rounded-lg text-white -mb-1 cursor-pointer block"
                >
                  Update Profile
                </button>
                <UpdateUserModal
                  isOpen={isOpen}
                  closeModal={closeModal}
                  email={user.email}
                  data={data}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
