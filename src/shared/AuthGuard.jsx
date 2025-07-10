import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const AuthGuard = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("userToken");
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
