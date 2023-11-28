import axios from "axios";
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
//update user in db
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
// update user role
export const updateUserRole = async (user, email) => {
  const currentUser = {
    role: user.role,
    status: user.status,
  };
  const { data } = await axiosSecure.put(`/user/update/${email}`, currentUser);
  return data;
};
// get users
export const getUsers = async () => {
  const { data } = await axiosSecure("/users");
  return data;
};
// get users pagination
export const getPaginationUsers = async (currentPage, itemsPerPage, status) => {
  const { data } = await axiosSecure(
    `/users/selected?page=${currentPage}&size=${itemsPerPage}&status=${status}`
  );
  return data;
};
// get role
export const getRole = async (email) => {
  const { data } = await axiosSecure(`/user/role/${email}`);
  return data.role;
};
// get status
export const getStatus = async (email) => {
  const { data } = await axiosSecure(`/user/role/${email}`);
  return data.status;
};
// get user
export const getUser = async (email) => {
  const { data } = await axiosSecure(`/user/role/${email}`);
  return data;
};
//get donor
export const getDonor = async (upazila, district, bloodGroup) => {
  const { data } = await axiosSecure(
    `/user/find-donor/${bloodGroup}?upazila=${upazila}&district=${district}`
  );
  return data;
};
// post blog
export const postBlog = async (blogInfo) => {
  const blog = {
    title: blogInfo.title,
    photoURL: blogInfo.photoURL,
    content: blogInfo.content,
    status: "draft",
  };
  const { data } = await axiosSecure.post("/blogs/add-blog", blog);
  return data;
};
// get all blogs
export const getAllBlogs = async (status) => {
  const { data } = await axiosSecure(`/blogs?status=${status}`);
  return data;
};
// get all published blogs
export const getPublishedBlogs = async () => {
  const { data } = await axiosSecure("/blogs/published");
  return data;
};
// publish/upPublish blog
export const updateBlogStatus = async (id, status) => {
  const { data } = await axiosSecure.patch(`/blog/${id}`, status);
  return data;
};
// delelet blog
export const deleteBlog = async (id) => {
  const data = axiosSecure.delete(`/blog/${id}`);
  return data;
};
// add blood donation request
export const createBloodDonationReq = async (info) => {
  const data = await axiosSecure.post("/blood-donations", info);
  return data;
};
// get donors specific blood requests
export const getMyAllSpecificBloodRequest = async (email) => {
  const { data } = await axiosSecure(`/my-blood-donations/${email}`);
  return data;
};
// get donors specific blood requests pagination
export const getSpecificBloodRequest = async (
  email,
  currentPage,
  itemsPerPage,
  donationStatus
) => {
  const { data } = await axiosSecure(
    `/blood-donations/${email}?page=${currentPage}&size=${itemsPerPage}&donationStatus=${donationStatus}`
  );
  return data;
};
// get donors specific recent 3 requests
export const getRecentThreeRequests = async (email) => {
  const { data } = await axiosSecure(`/blood-donations/recent/${email}`);
  return data;
};
// get single blood donation request
export const getSingleBloodRequest = async (id) => {
  const { data } = await axiosSecure(`/blood-donation/${id}`);
  return data;
};
// delete blood donate request
export const deleteBloodRequest = async (id) => {
  const { data } = await axiosSecure.delete(`/blood-donation/${id}`);
  return data;
};
// update blood donate request
export const updateBloodRequest = async (id, info) => {
  const { data } = await axiosSecure.patch(
    `/blood-donation/update/${id}`,
    info
  );
  return data;
};
//get all blood donation requests
export const allBloodDonationRequests = async () => {
  const { data } = await axiosSecure("/blood-donations");
  return data;
};
//get blood donation requests paginations
export const paginationBloodRequests = async (
  currentPage,
  itemsPerPage,
  donationStatus
) => {
  const { data } = await axiosSecure(
    `/blood-donation/selected?page=${currentPage}&size=${itemsPerPage}&donationStatus=${donationStatus}`
  );
  return data;
};
// get all  available / pending blood requests
export const allPendingDonationRequests = async () => {
  const { data } = await axiosSecure("/blood-donations/available/pending");
  return data;
};
