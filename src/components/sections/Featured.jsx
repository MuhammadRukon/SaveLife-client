import { useQuery } from "@tanstack/react-query";
import React from "react";
import { allCompleteDonationRequests } from "../../api/auth";

const Featured = () => {
  const { data: complete, isLoading } = useQuery({
    queryKey: ["completeDonations"],
    queryFn: async () => await allCompleteDonationRequests(),
  });
  return (
    <div>
      <h2 className="text-center font-bold font-primary mt-20 text-5xl">
        Featured
      </h2>
      <p className="text-center mt-6 italic tracking-widest">
        Successful blood donations through SaveLife
      </p>
      <div className="grid grid-cols-1 mt-6 lg:grid-cols-2 gap-10">
        {complete?.slice(0, 4)?.map((data) => (
          <div key={data?._id} className=" mt-10 text-left">
            <div className="items-start relative h-full gap-10 rounded-2xl pt-10 px-10 pb-4 flex-col lg:flex-row shadow-[0_3px_20px_rgba(0,0,0,0.15)]">
              <div className="flex mt-2">
                <div className="flex-1">
                  <p className="font-semibold underline">Recipient</p>
                  <h1 className="text-lg capitalize md:text-xl font-bold">
                    {data?.recipientName}
                  </h1>
                  <h1 className="text-sm md:text-base mt-1">
                    from: {data?.recipientDistrict}
                  </h1>
                </div>
                <div className="divider  my-auto  lg:divider-horizontal"></div>
                <div className="text-right flex-1">
                  <p className="font-bold underline">Donor</p>
                  <h1 className="text-lg capitalize md:text-xl font-bold">
                    {data?.donorName}
                  </h1>
                  <h1 className="text-sm md:text-base mt-1">
                    {data?.donorEmail}
                  </h1>
                </div>
              </div>
              <div>
                <div className="text-center mt-10 font-bold">
                  <p>Completion Date:{data.donationDate}</p>
                  <p>{data.hospitalName}</p>
                </div>
                <div className="text-center mt-4 leading-5 opacity-50 italic">
                  <p>
                    Requested:{data.requesterName} <br />
                    {data.requesterEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
