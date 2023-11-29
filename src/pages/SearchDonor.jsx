import React, { useEffect, useState } from "react";
import GetLocation from "../components/shared/GetLocation";
import Container from "../components/shared/Container";

import { getDonor } from "../api/auth";

const SearchDonor = () => {
  const [loadedData, setLoadedData] = useState([]);
  const [text, setText] = useState("");
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
        if (data.length) {
          setText("Found");
        } else setText("No Donors found, try with different data");
      } catch (error) {}
    };
    fetchData();
  }, [effect]);

  const handleSearch = () => {
    setEffect(!effect);
    setText("searching");
  };
  return (
    <Container>
      <div className="text-center">
        <h2 className=" mt-16 text-3xl mb-10 lg:text-5xl">Search Donors</h2>
        <div className="w-4/5 lg:w-1/3 relative mx-auto">
          <GetLocation location={location} setLocation={setLocation} />

          <span
            onClick={handleSearch}
            className="btn absolute  bottom-0 right-0 bg-primary hover:bg-primary text-white px-[50px] xl:px-[68px] text-lg mt-5"
          >
            Search
          </span>
        </div>

        {loadedData?.map((data) => (
          <div key={data?._id} className="hero mt-10 text-left">
            <div className="hero-content items-start gap-10 rounded-2xl max-w-2xl p-5 md:p-10 flex-col lg:flex-row shadow-[0_3px_20px_rgba(0,0,0,0.15)]">
              <div className="xl:w-2/5 bg-black rounded-xl overflow-hidden">
                <img src={data?.photoURL} className="opacity-70" alt="" />
              </div>
              <div className="w-3/5">
                <h1 className="text-2xl capitalize md:text-4xl font-bold">
                  Name: {data?.displayName}
                </h1>
                <h1 className="text-lg md:text-2xl mt-4">
                  Location: {data?.upazila}, {data?.district}
                </h1>
                <h1 className="text-lg md:text-2xl mt-4">
                  Blood Group: {data?.bloodGroup}
                </h1>
                <h1 className="text-lg md:text-2xl my-4">
                  Status:{" "}
                  <span
                    className={`bg-black capitalize px-3 py-[2px] rounded-full ${
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
        {!loadedData.length && (
          <h1 className=" mt-16 text-3xl mb-10 lg:text-5xl">{text}</h1>
        )}
      </div>
    </Container>
  );
};

export default SearchDonor;
