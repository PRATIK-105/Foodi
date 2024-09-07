import React, {  useContext } from "react";
import { AuthContext } from "../context/Authprovider";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";

function PrivateRouter({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/signup" state={{ from: location }} replace />;
}
export default PrivateRouter;
