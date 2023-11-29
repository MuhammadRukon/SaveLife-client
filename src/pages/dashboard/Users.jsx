import UserDataRow from "../../components/dashboard/table/UserDataRow";
import { useQuery } from "@tanstack/react-query";
import { getPaginationUsers, getUsers } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

const Users = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [loadedData, setLoadedData] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [effect, setEffect] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    enabled: !!user,
    queryKey: ["users"],
    queryFn: async () => await getUsers(),
  });
  // pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPaginationUsers(
          currentPage,
          itemsPerPage,
          status
        );
        setLoadedData(data);
      } catch (error) {}
    };
    fetchData();
  }, [effect, user?.email, currentPage, itemsPerPage, status]);
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
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-center text-4xl mb-6">
            All Users : {data?.length}
          </h2>

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
              <option disabled>all users</option>
              <option value="active">active</option>
              <option value="blocked">blocked</option>
            </select>
          </div>

          <div className="-mx-4 sm:-mx-8 px-2 lg:px-8 py-4  overflow-scroll">
            <div className="inline-block min-w-full  drop-shadow-[0_2px_7px_rgba(0,0,0,0.10)] rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-4 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-4 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-4 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-4 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-4 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-4 lg:px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action/s
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* User data table row */}
                  {!isLoading &&
                    loadedData?.map((data, index) => (
                      <UserDataRow user={data} key={index} refetch={refetch} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default Users;
