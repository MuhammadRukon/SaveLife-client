import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSpecificBloodRequest } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import RequestRow from "./RequestRow";

const MyDonationRequest = () => {
  const { user } = useAuth();
  const {
    data: myDonations,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user,
    queryKey: ["myDonations"],
    queryFn: async () => await getSpecificBloodRequest(user?.email),
  });
  return (
    <>
      <h2 className="text-3xl xl:text-5xl text-center mt-10">
        {" "}
        My donation Requests
      </h2>
      <div className="flex justify-center">
        {myDonations?.length > 0 ? (
          <table className="mt-10 drop-shadow-[0_0_7px_rgba(0,0,0,0.2)] rounded-xl">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Recipient Info
                </th>
                <th
                  scope="col"
                  className="px-5 py-3  bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="px-5 py-3  bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="px-5 lg:text-center py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=" rounded-xl">
              {myDonations?.length &&
                myDonations.map((request, index) => (
                  <RequestRow request={request} key={index} refetch={refetch} />
                ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-4xl mt-10 font-semibold">
            No Donation requests yet!
          </h2>
        )}
      </div>
    </>
  );
};

export default MyDonationRequest;
