import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="flex items-center gap-2" to="/">
      <img
        src="https://i.ibb.co/5xfsNwX/logo.png"
        alt="logo"
        className="w-10 h-10 lg:w-12 lg-h-12"
      />
      <p className="text-xl lg:text-2xl font-bold font-satisfy">Save<span className="font-primary">Life</span></p>
    </Link>
  );
};

export default Logo;
