import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userContext from "../../../context/userContext";

const RequiresAuth = () => {
  const auth = useContext(userContext);
  return auth?.user ? <Outlet /> : <Navigate to="/" />;
};

export default RequiresAuth;