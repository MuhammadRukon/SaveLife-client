import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import avatarImg from "../../assets/placeholder.jpg";
import useAuth from "../../hooks/useAuth";
import Navlinks from "./Navlinks";

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* menus */}
        <div className="hidden md:block transition delay-500">
          <Navlinks setIsOpen={setIsOpen} />
        </div>
        {/* profile */}
        {user && (
          <div className="flex gap-2 items-center ">
            <img
              className="rounded-full"
              referrerPolicy="no-referrer"
              src={user && user.photoURL ? user.photoURL : avatarImg}
              alt="profile"
              height="30"
              width="30"
            />

            <p className="capitalize">{user?.displayName || "name"}</p>
          </div>
        )}
        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 px-3 md:py-[6px] 
          } md:px-[10px] border-[1px] md:hidden border-neutral-200 flex flex-row items-center gap-3 rounded-md md:rounded-full cursor-pointer hover:shadow-md transition`}
        >
          <div className="hidden md:block">{/* Avatar */}</div>
          <AiOutlineMenu size={20} />
        </div>
        {isOpen && (
          <div className="absolute text-black rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              <Navlinks />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDropdown;
