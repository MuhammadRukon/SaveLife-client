import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero "
      style={{
        backgroundImage: "url(https://i.ibb.co/DMpvGHK/bloodbanner.jpg)",
      }}
    >
      {/* <div className="hero-overlay bg-opacity-60 py-56"></div> */}
      <div className="hero-content text-center text-neutral-content py-56">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-primary text-secondary font-bold">
            Donate Blood
          </h1>
          <p className="mb-5 text-lg tracking-wider italic text-secondary font-semibold">
            Your donation can save a life.
          </p>

          <div className="space-x-4 font-semibold text-lg mt-10">
            <Link
              to="/signup"
              className="bg-red-600 w-fit px-4 rounded-md py-3 text-white"
            >
              Join as a donor
            </Link>
            <Link
              to="/search-donors"
              className="bg-red-600 w-fit px-4 rounded-md py-3 text-white"
            >
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
