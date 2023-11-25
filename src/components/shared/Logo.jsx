import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";

const Logo = () => {
  return (
    <Link className="flex items-center gap-2" to="/">
      <img src={logoImg} alt="logo" width="50" height="50" />
      <p className="text-2xl font-bold font-primary">SaveLife</p>
    </Link>
  );
};

export default Logo;
