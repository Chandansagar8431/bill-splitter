import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Landing = () => {
  return (
    <div className=" h-screen w-screen bg-custom-blue font-sans p-2 overflow-y-auto">
      <Navbar />
      outlet
      <Outlet />
    </div>
  );
};

export default Landing;
