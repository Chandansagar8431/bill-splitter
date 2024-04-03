import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [barToggle, setBarToggle] = useState(false);
  console.log(barToggle);
  return (
    <>
      <div className="flex flex-row justify-between sticky top-0  bg-custom-blue w-screen h-10 py-1">
        <div className="flex gap-2">
          <div className="flex relative">
            {!barToggle ? (
              <FontAwesomeIcon
                onClick={() => setBarToggle(!barToggle)}
                icon={faBars}
                size="xl"
                className="mt-1"
              />
            ) : null}
            {barToggle && (
              <div className="w-[300px] h-screen z-10 flex justify-between bg-toggle-block absolute top-0 left-0">
                <div className="flex flex-col text-gray-200">
                  <Link to="/">Profile</Link>
                </div>
                <FontAwesomeIcon
                  className="text-white p-1"
                  icon={faXmark}
                  size="xl"
                  onClick={() => setBarToggle(!barToggle)}
                />
              </div>
            )}
          </div>

          <div className="flex rounded-full bg-black-green">
            <span className="px-2 pt-0.5 rounded-full text-white font-bold text-lg">
              Food
            </span>
            <span className="rounded-full bg-orange-shade font-bold px-2 pt-0.5 text-lg">
              Furry
            </span>
          </div>
        </div>
        <input
          type="text"
          placeholder="search"
          className=" bg-slate-200 rounded-xl px-2 border-2 border-blue-200 focus:outline-none w-80"
        />
        <div className=" mr-10">
          <FontAwesomeIcon icon={faCartShopping} size="xl" className="mt-0.5" />
          <span className="bg-gray-200 border-blue-600 rounded-full absolute top-3 border-2 h-5 w-6 px-1 pt-0.5 text-xs ">
            17
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
