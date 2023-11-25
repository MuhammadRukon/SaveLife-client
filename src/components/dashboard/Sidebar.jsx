import { useState } from "react";
// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars, AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

// components
import useAuth from "../../hooks/useAuth";
// import ToggleButton from "../ToggleButton";
import useRole from "../../hooks/useRole";
import Logo from "../shared/Logo";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
// import HostMenu from "./HostMenu";
// import GuestMenu from "./GuestMenu";
// import AdminMenu from "./AdminMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  //   const [toggle, setToggle] = useState(false);
  const [isActive, setActive] = useState(false);
  const [role] = useRole();
  //   const role = "volunteer";

  console.log("role", role);
  //   For guest/host menu item toggle button
  //   const toggleHandler = (event) => {
  //     setToggle(event.target.checked);
  //   };
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-primary text-white flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Logo />
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-red-800"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col text-white justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-primary mx-auto">
              <Logo />
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between text-secondary flex-1 mt-6">
            {/* If a user is volunteer */}
            {/* {role === "volunteer" && (
              <ToggleButton toggleHandler={toggleHandler} />
            )} */}
            <nav>
              <MenuItem icon={AiFillHome} label="Home" address="/dashboard" />

              {/* Menu Items */}
              {/* {role === "donor" && "donor"} */}
              {role === "volunteer" ? (toggle ? "voluteerMenu" : "donor") : ""}
              {role === "admin" && "admin"}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <MenuItem
            icon={FaUser}
            label="Profile"
            address="/dashboard/profile"
          />
          <button className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5" />

            <span onClick={logOut} className="mx-4 font-medium">
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
