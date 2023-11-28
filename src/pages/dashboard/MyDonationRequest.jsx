import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getMyAllSpecificBloodRequest,
  getSpecificBloodRequest,
} from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import RequestRow from "./RequestRow";

const MyDonationRequest = () => {
  const [myDonations, setMyDonations] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [donationStatus, setDonationStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [effect, setEffect] = useState(false);
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    enabled: !!user,
    queryKey: ["myDonations"],
    queryFn: async () => await getMyAllSpecificBloodRequest(user?.email),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpecificBloodRequest(
          user?.email,
          currentPage,
          itemsPerPage,
          donationStatus
        );
        setMyDonations(data);
      } catch (error) {}
    };
    fetchData();
  }, [effect, user?.email, currentPage, itemsPerPage, donationStatus]);

  // pagination
  useEffect(() => {
    if (data) {
      const pages = Math.ceil(data.length / itemsPerPage);
      setNumberOfPages(pages);
    }
  }, [isLoading, data, itemsPerPage]);

  const pages = [...Array(numberOfPages).keys()];

  const handleChangePage = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    setEffect(!effect);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setEffect(!effect);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
      setEffect(!effect);
    }
  };
  // pagination
  return (
    <>
      <h2 className="text-3xl xl:text-5xl text-center mt-10">
        My donation Requests : {data?.length}
      </h2>
      <div className="w-1/2 mx-auto">
        <p className="text-left mt-10">filter:</p>
        <div className="text-left mt-2">
          <select
            defaultValue="all"
            onChange={(e) => {
              setDonationStatus(e.target.value);
              setEffect(!effect);
            }}
            className="select select-bordered w-[200px] max-w-xs"
          >
            <option disabled>all</option>
            <option value="pending">pending</option>
            <option value="done">done</option>
            <option value="pending">inprogress</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </div>
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
      {myDonations?.length && (
        <div className="py-10 text-center">
          <button onClick={handlePreviousPage} className="btn mr-1">
            ←prev
          </button>
          <div className="join">
            {pages?.map((page, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(page + 1)}
                className={`join-item  border-gray-300 ${
                  page + 1 === currentPage && "btn-active"
                } btn`}
              >
                {page + 1}
              </button>
            ))}
          </div>
          <button onClick={handleNextPage} className="btn ml-1">
            next→
          </button>
          <select
            className="select select-bordered ml-1 focus:outline-none max-w-xs"
            value={itemsPerPage}
            onChange={handleChangePage}
            name=""
            id=""
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      )}
    </>
  );
};

export default MyDonationRequest;
