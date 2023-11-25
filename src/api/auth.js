import axiosSecure from ".";

//save user to db
export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role: "donor",
    status: "active",
    district: user.district,
    upazila: user.upazila,
    bloodGroup: user.bloodGroup,
  };
  const { data } = await axiosSecure.post("/users", currentUser);
  return data;
};
//save user in db
export const updateUser = async (user, email) => {
  const currentUser = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    district: user.district,
    upazila: user.upazila,
    bloodGroup: user.bloodGroup,
  };
  const { data } = await axiosSecure.put(`/user/update/${email}`, currentUser);
  return data;
};

// get role
export const getRole = async (email) => {
  const { data } = await axiosSecure(`/user/role/${email}`);
  return data.role;
};
