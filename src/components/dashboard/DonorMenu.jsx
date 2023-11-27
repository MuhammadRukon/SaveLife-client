import React from "react";
import MenuItem from "./MenuItem";
import { PiUsersThreeFill } from "react-icons/pi";
const DonorMenu = () => {
  return (
    <>
      <MenuItem
        label="My Blood Donation Requests"
        icon={PiUsersThreeFill}
        address="my-blood-donation-requests"
      />
      <MenuItem
        address="create-donation-request"
        label="Create Donation Request"
        icon={PiUsersThreeFill}
      />
    </>
  );
};

export default DonorMenu;
