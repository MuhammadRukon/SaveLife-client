import { useState } from "react";
import UpdateRoleStatusModal from "../../Modal/UpdateRoleStatusModal";

const UserDataRow = ({ user, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <tr>
      <td className="px-2 lg:px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <img
          className="h-12 w-12 object-cover rounded-lg"
          src={user?.photoURL}
          alt=""
        />
      </td>
      <td className="px-2 lg:px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-2 lg:px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.displayName}</p>
      </td>
      <td className="px-2 lg:px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap font-semibold">
          {user?.role}
        </p>
      </td>
      <td className="px-2 lg:px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "active" ? "text-green-500" : "text-red-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>
      <td className="px-2 lg:px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-secondary leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-blue-200 opacity-50 rounded-lg"
          ></span>
          <span onClick={() => setIsOpen(!isOpen)} className="relative">
            Update Role/Status
          </span>
        </span>
        {/* Modal */}
        <UpdateRoleStatusModal
          user={user}
          isOpen={isOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          modalHandler={closeModal}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
