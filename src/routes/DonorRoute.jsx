import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import Loader from "../components/shared/Loader";

const DonorRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <Loader />;
  if (role === "donor") return children;
  return <Navigate to="/dashboard" />;
};

export default DonorRoute;
