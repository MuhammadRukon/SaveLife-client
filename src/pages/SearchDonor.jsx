import React, { useEffect, useState } from "react";
import GetLocation from "../components/shared/GetLocation";
import Container from "../components/shared/Container";

import { getDonor } from "../api/auth";

const SearchDonor = () => {
  const [loadedData, setLoadedData] = useState([]);
  const [effect, setEffect] = useState(false);
  const [location, setLocation] = useState({
    upazila: "Select Upazila",
    district: "Select District",
    bloodGroup: "Select Blood Group",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDonor(
          location.upazila,
          location.district,
          location.bloodGroup
        );
        setLoadedData(data);
      } catch (error) {}
    };
    fetchData();
  }, [effect]);

  const handleSearch = () => {
    setEffect(!effect);
  };
  return (
    <Container>
      <div className="text-center">
        <h2 className=" mt-16 text-3xl mb-10 lg:text-5xl">Search Donors</h2>
        <div className="w-1/3 relative mx-auto">
          <GetLocation location={location} setLocation={setLocation} />

          <span
            onClick={handleSearch}
            className="btn absolute  bottom-0 right-0 bg-primary hover:bg-primary text-white px-[68px] text-lg mt-5"
          >
            Search
          </span>
        </div>

        {loadedData?.map((data) => (
          <div key={data?._id} className="hero mt-10 text-left">
            <div className="hero-content items-start gap-10 rounded-2xl max-w-[1180px] p-5 md:p-10 flex-col lg:flex-row shadow-[0_3px_20px_rgba(0,0,0,0.15)]">
              <div className="xl:w-2/5 bg-black rounded-xl overflow-hidden">
                <img src={data?.photoURL} className="opacity-70" alt="" />
              </div>
              <div className="w-3/5">
                <h1 className="text-3xl capitalize md:text-4xl font-bold mt-8">
                  Name: {data?.displayName}
                </h1>
                <h1 className="text-xl md:text-3xl mt-8">
                  Location: {data?.upazila}, {data?.district}
                </h1>
                <h1 className="text-xl md:text-3xl mt-8">
                  Blood Group: {data?.bloodGroup}
                </h1>
                <h1 className="text-xl md:text-3xl mt-8">
                  Status:{" "}
                  <span
                    className={`bg-black capitalize px-4 py-1 rounded-full ${
                      data?.status === "active"
                        ? "bg-green-400 text-green-900"
                        : "bg-red-400 text-red-900"
                    }`}
                  >
                    {data?.status}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default SearchDonor;
