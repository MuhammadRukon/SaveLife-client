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
