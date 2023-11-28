import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getRecentThreeRequests } from "../../../api/auth";
import RequestRow from "../RequestRow";
import { Link } from "react-router-dom";

const DonorHomePage = () => {
  const { user } = useAuth();
  const {
    data: myDonations,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user,
    queryKey: ["recentRequests"],
    queryFn: async () => await getRecentThreeRequests(user?.email),
  });
  return (
    <div className="overflow-hidden px-3">
      {myDonations?.length > 0 && (
        <h2 className="text-3xl xl:text-5xl text-center mt-10">
          My Recent Requests
        </h2>
      )}
      <div className="flex justify-center">
        {myDonations?.length > 0 ? (
          <>
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
                    Donation Date & Time
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
                    <RequestRow
                      request={request}
                      key={index}
                      refetch={refetch}
                    />
                  ))}
              </tbody>
            </table>
          </>
        ) : (
          <h2 className="text-2xl lg:text-4xl mt-20 font-semibold">
            No Donation requests yet!
          </h2>
        )}
      </div>
      {myDonations?.length > 0 && (
        <div className="text-center mb-10">
          <Link
            className="btn bg-primary mx-auto text-white hover:bg-primary mt-10"
            to="my-blood-donation-requests"
          >
            My donation Requests
          </Link>
        </div>
      )}
    </div>
  );
};

export default DonorHomePage;
