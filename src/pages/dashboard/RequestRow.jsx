import React, { useState } from "react";

import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { updateBloodRequest } from "../../api/auth";

const RequestRow = ({ request, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const requestMsg = request.requestMsg;
  const shortrequestMsg = requestMsg.slice(0, 40);
  return (
    <tr>
      <td className="px-2 lg:px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-start lg:gap-2">
          <div className="ml-3 max-w-xl">
            <p className="text-gray-900 capitalize whitespace-no-wrap font-semibold text-base lg:text-lg">
              name: {request.recipientName}
            </p>
            <p className="text-gray-900 mt-1 whitespace-no-wrap font-semibold text-base lg:text-lg">
              Location: {request.recipientDistrict}, {request.recipientUpazila}
            </p>
            <p className="text-gray-900 mt-2 whitespace-no-wrap font-semibold text-sm lg:text-base">
              hospital: {request.hospitalName}
            </p>
            <p className="text-gray-900 pt-2 text-sm lg:text-base whitespace-no-wrap">
              {isOpen ? requestMsg : shortrequestMsg}
              <span
                className="text-blue-600 italic text-xs lg:text-sm cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {" "}
                {isOpen ? "...view less." : "view more..."}
              </span>
            </p>
            {request.donationStatus === "inprogress" ? (
              <>
                <p className="text-gray-900 pt-2 text-sm font-semibold lg:text-base whitespace-no-wrap">
                  Requester name:{request.requesterName}
                </p>
                <p className="text-gray-900 text-sm font-semibold lg:text-base whitespace-no-wrap">
                  Requester email:{request.requesterEmail}
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </td>
      <td className="px-2 lg:px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-start lg:gap-2">
          <div className="ml-3 max-w-xl">
            <p className="text-gray-900 whitespace-no-wrap text-sm lg:text-base">
              {request?.donationDate}, {request?.donationTime}
            </p>
          </div>
        </div>
      </td>
      <td className="px-1 lg:py-5 border-b space-x-3 border-gray-200 bg-white text-sm">
        <span
          className={`relative inline-block px-3 py-1 font-semibold ${
            request?.donationStatus === "pending" ||
            request?.donationStatus === "inprogress" ||
            request?.donationStatus === "cancelled"
              ? "text-yellow-600"
              : "text-green-600"
          } leading-tight`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 ${
              request?.donationStatus === "pending" ||
              request?.donationStatus === "inprogress" ||
              request?.donationStatus === "cancelled"
                ? "bg-yellow-100"
                : "bg-green-100 "
            }  rounded-full`}
          ></span>
          <span className="relative">{request.donationStatus}</span>
        </span>
      </td>

      <td className="px-2 lg:px-5 border-b space-x-3 border-gray-200 bg-white text-sm">
        <div className="flex flex-col gap-2 text-center">
          {/* done and cancel button */}
          {request?.donationStatus === "inprogress" ? (
            <div className="flex flex-col gap-2">
              <span
                onClick={() =>
                  Swal.fire({
                    title: "Are you sure?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "confirm",
                  }).then(async (result) => {
                    const statusInfo = { donationStatus: "done" };
                    if (result.isConfirmed) {
                      const response = await updateBloodRequest(
                        request._id,
                        statusInfo
                      );
                      if (response.modifiedCount > 0) {
                        Swal.fire({
                          title: "Updated",
                          text: "Blood Donation Request updated.",
                          icon: "success",
                        });
                        refetch();
                      } else {
                        toast.error("could not update");
                      }
                    }
                  })
                }
                className="relative cursor-pointer inline-block px-3 py-1 font-semibold hover:scale-110 transition text-green-900 leading-tight"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-green-400  rounded-md"
                ></span>
                <span className="relative flex gap-1 items-center justify-center">
                  Done
                </span>
              </span>
              <span
                onClick={() =>
                  Swal.fire({
                    title: "Are you sure?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "confirm",
                  }).then(async (result) => {
                    const statusInfo = { donationStatus: "cancelled" };
                    if (result.isConfirmed) {
                      const response = await updateBloodRequest(
                        request._id,
                        statusInfo
                      );
                      if (response.modifiedCount > 0) {
                        Swal.fire({
                          title: "Updated",
                          text: "Blood Donation Request updated.",
                          icon: "success",
                        });
                        refetch();
                      } else {
                        toast.error("could not update");
                      }
                    }
                  })
                }
                className="relative cursor-pointer inline-block px-3 py-1 font-semibold hover:scale-110 transition text-red-950 leading-tight"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-red-400  rounded-md"
                ></span>
                <span className="relative flex gap-1 items-center justify-center">
                  Cancel
                </span>
              </span>
            </div>
          ) : request?.donationStatus !== "cancelled" &&
            request?.donationStatus !== "done" ? (
            // edit button
            <Link
              to={`/dashboard/blood-donation-request/update/${request?._id}`}
              className="relative cursor-pointer inline-block px-3 py-1 font-semibold hover:scale-110 transition text-secondary leading-tight"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-blue-400  rounded-md"
              ></span>
              <span className="relative flex items-center justify-center gap-2">
                edit
                <FaEdit color="black" size={12} />
              </span>
            </Link>
          ) : (
            ""
          )}
        </div>
      </td>
    </tr>
  );
};

export default RequestRow;
