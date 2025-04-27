import React, { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaBars, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { logout } from "../utils/api";

const Header = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    dispatch(setUser(null));
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navLinks = ["Contact", "Analyse", "Plans", "Services"];

  return (
    <>
      {/* <div className="text-xl text-white bg-slate-950 py-5 px-5 sticky top-0 z-20"> */}
      <div className="text-xl text-black bg-white py-5 px-5 sticky top-0 z-20 border-b-2">
        <div className="max-w-7xl mx-auto flex justify-between ">
          <div className="flex items-center gap-16 max-lg:gap-6 ">
            <div className="flex items-center gap-4">
              <FaBars
                onClick={() => navigate("/mobileNavigation")}
                className="text-blue-700 text-2xl cursor-pointer hidden max-md:block"
              />
              <p className="text-3xl text-black/90 font-bold max-sm:text-xl max-md:text-2xl">
                <Link to={"/"}>
                  Skill <span className="text-blue-700">Analyser</span>{" "}
                </Link>
              </p>
            </div>
            <div className="flex gap-6 max-md:hidden">
              {navLinks.map((link) => {
                return (
                  <div className=" cursor-pointer font-semibold" key={link}>
                    <Link
                      to={`/${link.toLowerCase()}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {link}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          {user ? (
            <div className="flex gap-4 items-center">
              <p className="text-blue-500 hover:text-blue-700">
                {" "}
                {user?.fullname}
              </p>
              <FaUserCircle className="text-blue-500 text-4xl hover:text-blue-700" />
              <button
                onClick={handleLogout}
                className=" border-[2px] border-black p-2 text-lg rounded-xl bg-blue-700/90 w-28 text-white hover:bg-blue-800  "
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to={"/login"}>
                <button className="border-[2px] w-28 max-sm:w-20 max-sm:text-sm border-slate-400 p-2 text-lg rounded-xl bg-blue-700/90 text-white hover:bg-blue-800  ">
                  Sign In
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="border-[2px] w-28 max-sm:w-20 max-sm:text-sm border-slate-400 p-2 text-lg rounded-xl bg-white text-gray-600 hover:bg-slate-200  ">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
