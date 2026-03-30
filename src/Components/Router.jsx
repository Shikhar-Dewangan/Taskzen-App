import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, authentication = true }) => {
  const user = useSelector((state) => state.auth.user);

  if (authentication && !user) {
    return <Navigate to="/login" />;
  }

  if (!authentication && user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;