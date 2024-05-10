import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Inventory from "./scenes/inventory";
import Branding from "../components/branding";
import { setProducts } from "../state/index";
import { UseDispatch, useDispatch, useSelector } from "react-redux";

const Landing = () => {
  const stagedProducts = useSelector((state) => state.authAndProducts.stage);
  const sessionToken = sessionStorage.getItem("token");
  console.log(sessionToken);
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div
      className={` h-screen w-screen font-sans bg-landing-color overflow-y-auto bg-opacity:${stagedProducts}?"0.5":"1"`}>
      <Navbar isSearching={isSearching} setIsSearching={setIsSearching} />
      <Branding />

      <Inventory isSearching={isSearching} setIsSearching={setIsSearching} />
      <Outlet />
    </div>
  );
};

export default Landing;
