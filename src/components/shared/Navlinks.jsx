import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navlinks = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <NavLink
        to="/"
        className="block md:hidden px-2 text-sm lg:text-base xl:px-4 py-3  lg:hover:bg-red-700 rounded-lg relative transition font-semibold"
      >
        Home
      </NavLink>
      {user && (
        <NavLink
          to="/dashboard"
          className="px-2 text-sm lg:text-base xl:px-4 py-3 relative lg:hover:bg-red-700 rounded-lg transition font-semibold"
        >
          Dashboard
        </NavLink>
      )}
      <NavLink
        to="/donation-request"
        className="px-2 text-sm lg:text-base xl:px-4 py-3 relative lg:hover:bg-red-700 rounded-lg transition font-semibold"
      >
        Donation request
      </NavLink>
      <NavLink
        to="/blog"
        className="px-2 text-sm lg:text-base xl:px-4 py-3 relative lg:hover:bg-red-700 rounded-lg transition font-semibold"
      >
        Blog
      </NavLink>

      {user && (
        <>
          {" "}
          <NavLink
            to="/fundings"
            className="px-2 text-sm lg:text-base xl:px-4 py-3 relative lg:hover:bg-red-700  rounded-lg transition font-semibold"
          >
            Fundings
          </NavLink>
          <Link
            onClick={() => {
              logOut();
              toast("logged out");
            }}
            className="px-2 text-sm lg:text-base xl:px-4 py-3 relative lg:hover:bg-red-700 rounded-lg transition font-semibold"
          >
            Logout
          </Link>
        </>
      )}
      {!user && (
        <>
          <NavLink
            to="/login"
            className="px-2 text-sm lg:text-base xl:px-4 py-3 relative lg:hover:bg-red-700 rounded-lg transition font-semibold"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="px-2 text-sm lg:text-base xl:px-4 py-3 relative lg:hover:bg-red-700 rounded-lg transition font-semibold"
          >
            signup
          </NavLink>
        </>
      )}
    </>
  );
};

export default Navlinks;
