import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";
import { logout } from "../utils/api";
import { motion } from "framer-motion";

const Header = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    dispatch(setUser(null));
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Analyse",
      href: "/analyse",
    },
    {
      name: "Plans",
      href: "/plans",
    },
    {
      name: "Services",
      href: "/services",
    },
  ];
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
      <div className="text-xl text-black bg-white px-5 sticky top-0 z-20 border-b-2">
        <div className="max-w-7xl mx-auto flex justify-between ">
          <div className="flex items-center gap-16 max-lg:gap-6 ">
            <div className="flex items-center gap-4">
              <FaBars
                onClick={() => setShowMobileNav(!showMobileNav)}
                className="text-blue-700 text-2xl cursor-pointer hidden max-md:block max-[500px]:text-xl"
              />
              <p className="text-3xl text-black/90 font-bold max-sm:text-base max-md:text-2xl max-[500px]:text-sm max-lg:text-2xl">
                <Link to={"/"}>
                  Skill <span className="text-blue-700">Analyser</span>{" "}
                </Link>
              </p>
            </div>
            <div className="flex gap-6 max-md:hidden">
              {navLinks.map((link) => {
                return (
                  <Link
                    to={`${link.href}`}
                    className="text-blue-600 hover:text-blue-800 max-lg:text-base"
                    key={link.name}
                  >
                    <div className="group cursor-pointer font-semibold relative py-5">
                      {link.name}
                      <motion.div
                        className={`absolute left-0 top-[95%] w-full h-1 bg-blue-600 rounded-full transition-all duration-300 origin-left group-hover:scale-x-100 ${
                          location.pathname === link.href
                            ? "scale-x-100"
                            : "scale-x-0"
                        }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          {user ? (
            <div className="flex gap-4 items-center max-md:gap-2">
              <p className="text-blue-500 hover:text-blue-700 max-sm:text-xs max-lg:text-sm max-[500px]:text-[10px]">
                {" "}
                {user?.fullname}
              </p>
              <FaUserCircle className="text-blue-500 text-4xl hover:text-blue-700 max-sm:text-2xl" />
              <button
                onClick={handleLogout}
                className=" border-[2px] border-black p-2 text-lg rounded-xl bg-blue-700/90 w-28 text-white hover:bg-blue-800 max-sm:text-sm max-sm:w-[100px] max-[500px]:text-[10px] max-[500px]:w-[80px] max-[500px]:p-1 max-md:my-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
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

      {showMobileNav && (
        <div className="flex flex-col gap-6 m-6 md:hidden">
          <FaTimes
            className="text-blue-500 hover:text-blue-700 text-2xl place-self-end"
            onClick={() => setShowMobileNav(false)}
          />
          {navLinks.map((link) => {
            return (
              <Link
                to={`${link.href}`}
                className="text-blue-500 hover:text-blue-700 "
                key={link.name}
              >
                <div className=" hover:text-slate-500 cursor-pointer font-semibold border-b-2 border-blue-500">
                  {link.name}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Header;
