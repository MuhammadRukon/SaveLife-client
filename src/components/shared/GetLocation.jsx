import React, { useEffect, useState } from "react";
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GetLocation = ({ location, setLocation }) => {
  const [districts, setDistricts] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [effect, setEffect] = useState(false);
  useEffect(() => {
    fetch("./divisions.json")
      .then((res) => res.json())
      .then((data) => setDivisions(data));
  }, []);
  useEffect(() => {
    fetch("./districts.json")
      .then((res) => res.json())
      .then((data) => {
        if (location.division) {
          const filter = data.filter(
            (district) => district.division_name === location.division
          );
          setDistricts(filter);
        } else setDistricts(data);
      });
  }, [effect]);
  return (
    <div className="flex flex-wrap justify-between gap-3 pt-2">
      <div className="w-[48%]">
        <select
          onChange={(e) => {
            setLocation({ ...location, division: e.target.value });
            setEffect(!effect);
          }}
          defaultValue="Select Division"
          className="select select-bordered w-full focus:outline-none focus:border-rose-500 max-w-xs"
          name="division"
        >
          <option disabled>Select Division</option>
          {divisions?.map(({ id, name }) => (
            <option key={id}>{name}</option>
          ))}
        </select>
      </div>
      <div className="w-[48%]">
        <select
          defaultValue="Select District"
          className="select select-bordered w-full focus:outline-none focus:border-rose-500 max-w-xs"
          name="district"
          onChange={(e) =>
            setLocation({ ...location, district: e.target.value })
          }
        >
          <option disabled>Select District</option>
          {location.division ? (
            districts?.map(({ id, name }, index) => (
              <option key={index}>{name}</option>
            ))
          ) : (
            <option disabled>Select Division first</option>
          )}
        </select>
      </div>
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
