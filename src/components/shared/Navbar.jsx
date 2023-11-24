import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import Container from "./Container";
import MenuDropdown from "./MenuDropdown";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-red-600 z-10 text-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link className="flex items-center gap-2" to="/">
              <img src={logoImg} alt="logo" width="50" height="50" />
              <p className="text-2xl font-bold font-primary">SaveLife</p>
            </Link>
            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
