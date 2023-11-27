import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import Loader from "../components/shared/Loader";

const VolunteerRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <Loader />;
  if (role === "volunteer" || role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

export default VolunteerRoute;
