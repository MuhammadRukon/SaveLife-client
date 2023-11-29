import { BiSolidDonateBlood } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import {
  allBloodDonationRequests,
  getAllTransactionInfo,
  getUsers,
} from "../../../api/auth";
import { useQuery } from "@tanstack/react-query";

const AdminHomePage = () => {
  const { data: allUsers } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => await getUsers(),
  });
  const { data: allRequests } = useQuery({
    queryKey: ["alldonationRequests"],
    queryFn: async () => await allBloodDonationRequests(),
  });
  const { data: allFundings } = useQuery({
    queryKey: ["allfundings"],
    queryFn: async () => await getAllTransactionInfo(),
  });

  return (
    <div className="mt-12">
      {/* small cards */}
      <div className="mb-12 px-4 w-[300px] sm:w-1/2 mx-auto grid gap-y-10 gap-x-6 md:grid-cols-2">
        {/* Users Card */}

        <div className="relative flex flex-col h-40 rounded-xl bg-white text-gray-700 shadow-[0_0_10px_rgba(0,0,0,0.15)]">
          <div
            className={`rounded-xl top-4 left-4 bg-gradient-to-tr shadow-[3px_3px_10px_rgba(0,0,0,0.08)] absolute grid h-16 w-16 place-items-center from-secondary to-blue-400 text-white shadow-blue-400`}
          >
            <FaUsers className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right font-sans text-xl md:text-2xl font-semibold absolute bottom-0 right-0">
            <p className="text-blue-gray-600">Total Users</p>
            <h4 className="text-blue-gray-900">{allUsers?.length}</h4>
          </div>
        </div>
        {/* requests card */}
        <div className="relative flex flex-col h-40 rounded-xl bg-white text-gray-700 shadow-[0_0_10px_rgba(0,0,0,0.15)]">
          <div
            className={`rounded-xl top-4 left-4 bg-gradient-to-tr shadow-[2px_2px_10px_rgba(0,0,0,0.08)] absolute grid h-16 w-16 place-items-center from-primary to-red-300 text-white shadow-red-400`}
          >
            <BiSolidDonateBlood className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right font-sans text-xl md:text-2xl font-semibold absolute bottom-0 right-0">
            <p className="text-blue-gray-600">Total Donation Requests</p>
            <h4 className="text-blue-gray-900">{allRequests?.length}</h4>
          </div>
        </div>
        <div className="relative flex flex-col h-40 rounded-xl bg-white text-gray-700 shadow-[0_0_10px_rgba(0,0,0,0.15)]">
          <div
            className={`rounded-xl top-2 left-2 bg-gradient-to-tr shadow-[2px_2px_10px_rgba(0,0,0,0.08)] absolute grid h-16 w-16 place-items-center from-green-700 to-green-400 text-white shadow-green-400`}
          >
            <FaHandHoldingDollar className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right font-sans text-xl md:text-2xl font-semibold absolute bottom-0 right-0">
            <p className="text-blue-gray-600">Total Fundings</p>
            <h4 className="text-blue-gray-900">
              {allFundings?.reduce((acc, data) => acc + data?.amount, 0)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
