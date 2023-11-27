import UserDataRow from "../../components/dashboard/table/UserDataRow";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

const Users = () => {
  const { user } = useAuth();
  const {
    data: loadedData,
    isLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["users"],
    queryFn: async () => await getUsers(),
  });
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-center text-4xl mb-6">All Users</h2>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full  drop-shadow-[0_2px_7px_rgba(0,0,0,0.10)] rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
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
        </div>
      </div>
    </>
  );
};

export default Users;
