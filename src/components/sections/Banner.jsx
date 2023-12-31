import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";

const Banner = () => {
  const { user } = useAuth();
  const [role] = useRole();
  return (
    <div
      className="hero"
      style={{
        backgroundImage: "url(https://i.ibb.co/R0kJxWS/bnr.png)",
      }}
    >
      {/* <div className="hero-overlay bg-opacity-60 py-56"></div> */}
      <div className="hero-content text-center text-neutral-content min-h-[calc(100vh-72px)]">
        <div className="max-w-lg">
          <h1 className="mb-5 text-6xl font-satisfy text-secondary font-bold">
            Donate Blood
          </h1>
          <p className="mb-5 text-xl tracking-wider text-secondary font-semibold">
            Your donation can save a life.
          </p>

          <div className="flex gap-4 flex-col sm:flex-row justify-center items-center font-semibold text-lg mt-10">
            {user ? (
              <button
                onClick={() =>
                  toast(
                    `you are already ${role === "admin" ? "an" : "a"} ${role}`
                  )
                }
                className="bg-primary w-fit hover:scale-110 transition-all px-2 md:px-4 rounded-md py-2 md:py-3 text-white"
              >
                Join as a donor
              </button>
            ) : (
              <Link
                to="/signup"
                className="bg-primary w-fit px-2 md:px-4 rounded-md py-2 md:py-3 text-white"
              >
                Join as a donor
              </Link>
            )}
            <Link
              to="/search-donors"
              className="bg-primary hover:scale-110 transition-all w-fit px-2 md:px-4 rounded-md py-[10px] md:py-[12px] text-white"
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
