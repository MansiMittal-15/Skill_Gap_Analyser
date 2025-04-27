import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const MobileNavigation = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-6 m-6 sm:hidden">
        <FaTimes
          className="text-blue-500 hover:text-blue-700 text-2xl place-self-end"
          onClick={() => navigate("/")}
        />
        <div className=" hover:text-slate-500 cursor-pointer font-semibold border-b-2 border-blue-500">
          <Link to={"/contact"} className="text-blue-500 hover:text-blue-700 ">
            Contact
          </Link>
        </div>
        <div className=" hover:text-slate-500 cursor-pointer font-semibold border-b-2 border-blue-500">
          <Link to="/features" className="text-blue-500 hover:text-blue-700">
            Features
          </Link>
        </div>
        <div className=" hover:text-blue-700/90 text-blue-500 cursor-pointer font-semibold z-100 flex items-center gap-1 border-b-2 border-blue-500">
          Pricing
        </div>
        <div className=" hover:text-blue-700/90 text-blue-500 cursor-pointer font-semibold flex items-center gap-1 border-b-2 border-blue-500">
          Services
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
