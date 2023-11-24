import axios from "axios";
import axiosSecure from ".";

//save user to db
export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
    name: user.displayName,
    image: user.photoURL,
    role: "admin",
    status: "active",
    district: user.district,
    upazila: user.upazila,
    bloodGroup: user.bloodGroup,
  };
  const { data } = await axiosSecure.post(`/users/${user?.email}`);
  return data;
};
