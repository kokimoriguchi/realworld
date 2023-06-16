import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./hooks/Auth";

const PrivateRoute = ({ children, ...props }) => {
  const { auth } = useContext(AuthContext);
  return auth ? <Route {...props}>{children}</Route> : <Navigate to="/login" />;
};

export default PrivateRoute;
