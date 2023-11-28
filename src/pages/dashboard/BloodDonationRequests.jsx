import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import {
  allBloodDonationRequests,
  paginationBloodRequests,
} from "../../api/auth";
import RequestRow from "./RequestRow";
import { useEffect, useState } from "react";

const BloodDonationRequests = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [requests, setRequests] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [effect, setEffect] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    enabled: !!user,
    queryKey: ["allRequests"],
    queryFn: async () => await allBloodDonationRequests(),
  });

  //paginations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paginationBloodRequests(
          currentPage,
          itemsPerPage,
          status
        );
        setRequests(data);
      } catch (error) {}
    };
    fetchData();
  }, [effect, user?.email, currentPage, itemsPerPage, status]);

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
  //paginations
  return (
    <>
      <h2 className="text-3xl xl:text-5xl text-center mt-10">
        {" "}
        All donation Requests : {data?.length}
      </h2>
      <div className="w-1/2 mx-auto">
        <p className="text-left mt-10">filter:</p>
        <div className="text-left mt-2">
          <select
            defaultValue="all"
            onChange={(e) => {
              setStatus(e.target.value);
              setEffect(!effect);
            }}
            className="select select-bordered w-[200px] max-w-xs"
          >
            <option disabled>all requests</option>
            <option value="pending">pending</option>
            <option value="done">done</option>
            <option value="inprogress">inprogress</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        {!isLoading && requests?.length > 0 ? (
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
              {requests?.length &&
                requests?.map((request, index) => (
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
      {requests && (
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
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
      )}
    </>
  );
};

export default BloodDonationRequests;
