import React from "react";
import MenuItem from "./MenuItem";
import { PiUsersThreeFill } from "react-icons/pi";
const AdminMenu = () => {
  return (
    <>
      <MenuItem label="All users" icon={PiUsersThreeFill} address="all-users" />
      <MenuItem
        label="All Blood Donation Request"
        icon={PiUsersThreeFill}
        address="all-blood-donation-request"
      />
      <MenuItem
        address="content-management"
        label="Content management"
        icon={PiUsersThreeFill}
      />
    </>
  );
};

export default AdminMenu;
