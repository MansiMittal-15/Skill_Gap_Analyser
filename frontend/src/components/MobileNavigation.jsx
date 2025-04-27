import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const MobileNavigation = () => {
  const dropDownRef = useRef(null);
  const [dropDownConfig, setDropDownConfig] = useState({
    isOpen: false,
    position: { left: 0, top: 0 },
    items: [],
    name: "",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropDownConfig((prev) => ({ ...prev, isOpen: false }));
      }
    };

    if (dropDownConfig.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownConfig.isOpen]);

  const handleToggleDropDown = (e, name, items) => {
    const isSameDropDown =
      dropDownConfig.isOpen && dropDownConfig.name === name;
    setDropDownConfig({
      isOpen: !isSameDropDown,
      position: { left: e.clientX, top: e.clientY + 20 },
      items: items,
      name: name,
    });
  };

  const navigate = useNavigate();

  return (
    <>
      {dropDownConfig?.isOpen && (
        <Dropdown
          ref={dropDownRef}
          items={dropDownConfig.items}
          position={dropDownConfig.position}
        />
      )}
      <div className="flex flex-col gap-6 m-6 ">
        <FaTimes className="text-blue-500 hover:text-blue-700 text-2xl place-self-end" onClick={()=> navigate("/")} />
        <div className=" hover:text-slate-500 cursor-pointer font-semibold border-b-2 border-blue-500">
          <Link
            to={"/contact"}
            className="text-blue-500 hover:text-blue-700 "
          >
            Contact
          </Link>
        </div>
        <div className=" hover:text-slate-500 cursor-pointer font-semibold border-b-2 border-blue-500">
          <Link
            to="/features"
            className="text-blue-500 hover:text-blue-700"
          >
            Features
          </Link>
        </div>
        <div
          className=" hover:text-blue-700/90 text-blue-500 cursor-pointer font-semibold z-100 flex items-center gap-1 border-b-2 border-blue-500"
          onClick={(e) =>
            handleToggleDropDown(e, "jobs", [
              "Free Trial",
              "Usage-Based Pricing",
              "Price Comparison",
              "Billing FAQs",
            ])
          }
        >
          Pricing
          <FaAngleDown className="text-blue-500 hover:text-blue-700" />
        </div>
        <div
          className=" hover:text-blue-700/90 text-blue-500 cursor-pointer font-semibold flex items-center gap-1 border-b-2 border-blue-500"
          onClick={(e) =>
            handleToggleDropDown(e, "services", [
              "Consulting Services",
              "Support Services",
              "Training and Development",
            ])
          }
        >
          Services
          <FaAngleDown className="text-blue-500 hover:text-blue-700" />
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
