import React from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { allPendingDonationRequests } from "../api/auth";
import { Link } from "react-router-dom";

const DonationRequest = () => {
  const { user } = useAuth();
  const {
    data: pendingRequests,
    isLoading,
    refetch,
  } = useQuery({
    // enabled: !!user,
    queryKey: ["pedingRequests"],
    queryFn: async () => await allPendingDonationRequests(),
  });
  return (
    <>
      <h2 className="text-center mt-20 font-primary text-3xl mb-10 xl:text-5xl">
        Blood Donation Request Details
      </h2>

      {pendingRequests?.map((data, index) => (
        <div
          key={index}
          className=" xl:w-3/5 mx-auto my-8 lg:my-16 px-4 lg:px-5"
        >
          <div className=" rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <div className="p-8 py-10 space-y-3  font-semibold flex flex-col justify-between flex-1">
              <h2 className="mb-5 2xl:mb-0 text-3xl capitalize font-semibold">
                <strong>Requester's Name: </strong> {data.requesterName}
              </h2>
              <p>
                <strong>Full Address Line:</strong> {data.address}
              </p>
              <p>
                <strong>District:</strong> {data.recipientDistrict}
              </p>
              <p>
                <strong>Upazila:</strong> {data.recipientUpazila}
              </p>
              <p>
                <strong>Donation Date:</strong> {data.donationDate}
                <span className="text-xs opacity-60"> (mm-dd-yyyy)</span>
              </p>
              <p>
                <strong>Donation Time:</strong> {data.donationTime}{" "}
                <span className="text-xs opacity-60">(24h)</span>
              </p>
            </div>
            <div className="ml-8 pb-10">
              <Link
                className="bg-primary btn text-white hover:bg-primary"
                to={`/dashboard/blood-donation-request/details/${data._id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DonationRequest;
