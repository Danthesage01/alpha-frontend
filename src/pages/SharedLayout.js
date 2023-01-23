import React from "react";
import { Outlet } from "react-router-dom";
import Welcome from "../components/Welcome";

const SharedLayout = () => {
  return (
    <React.Fragment>
      <Welcome />
      <Outlet />
    </React.Fragment>
  );
};

export default SharedLayout;
