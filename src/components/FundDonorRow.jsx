import moment from "moment/moment";
import React from "react";

const FundDonorRow = ({ user }) => {
  return (
    <tr>
      <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
        <img
          className="h-12 w-12 object-cover rounded-lg"
          src={user?.photoURL}
          alt=""
        />
      </td>
      <td className="px-1 sm:px-2 lg:px-4 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.displayName}</p>
      </td>
      <td className="px-2 lg:px-4 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-1 lg:px-4 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-semibold">
          {user?.amount} $
        </p>
      </td>
      <td className="px-1 lg:px-4 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-semibold">
          {moment(user?.date).format("mm-DD-yyyy")}
        </p>
      </td>
    </tr>
  );
};

export default FundDonorRow;
