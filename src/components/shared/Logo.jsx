import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="flex items-center gap-2" to="/">
      <img
        src="https://i.ibb.co/5xfsNwX/logo.png"
        alt="logo"
        width="50"
        height="50"
      />
      <p className="text-2xl font-bold font-primary">SaveLife</p>
    </Link>
  );
};

export default Logo;
