import React, { useEffect, useState } from "react";
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GetLocation = ({ location, setLocation }) => {
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [effect, setEffect] = useState(false);
  useEffect(() => {
    fetch("./districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);
  useEffect(() => {
    fetch("./upazila.json")
      .then((res) => res.json())
      .then((data) => {
        if (location.district) {
          const filter = data.filter(
            (upazila) => upazila.district_name === location.district
          );
          setUpazila(filter);
        } else setUpazila(data);
      });
  }, [effect]);
  return (
    <div className="flex flex-wrap justify-between gap-3 pt-2">
      {/* district */}
      <div className="w-[48%]">
        <select
          onChange={(e) => {
            setLocation({ ...location, district: e.target.value });
            setEffect(!effect);
          }}
          defaultValue="Select District"
          className="select select-bordered w-full focus:outline-none focus:border-rose-500 max-w-xs"
          name="district"
        >
          <option disabled>Select District</option>
          {districts?.map(({ id, name }) => (
            <option key={id}>{name}</option>
          ))}
        </select>
      </div>
      {/* upazila */}
      <div className="w-[48%]">
        <select
          defaultValue="Select Upazila"
          className="select select-bordered w-full focus:outline-none focus:border-rose-500 max-w-xs"
          name="upazila"
          onChange={(e) =>
            setLocation({ ...location, upazila: e.target.value })
          }
        >
          <option disabled>Select Upazila</option>
          {upazila?.map(({ name }, index) => (
            <option key={index}>{name}</option>
          ))}
        </select>
      </div>
      {/* blood */}
      <div className="w-[48%]">
        <select
          defaultValue="Select Blood Group"
          className="select select-bordered w-full focus:outline-none focus:border-rose-500 max-w-xs"
          name="bloodgroup"
          onChange={(e) =>
            setLocation({
              ...location,
              bloodGroup: e.target.value,
            })
          }
        >
          <option disabled>Select Blood Group</option>
          {bloodGroups.map((bloodgroup, index) => (
            <option key={index}>{bloodgroup}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GetLocation;
