import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "./isAuth";

interface IPrivateRoutesProps {}

const PrivateRoutes: React.FunctionComponent<IPrivateRoutesProps> = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
