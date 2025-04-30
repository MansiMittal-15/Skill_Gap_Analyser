import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaTimes, FaPlus, FaCoins } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";
import axios from "axios";

const MobileNavigation = () => {
  const { user } = useSelector((store) => store.user);
  const [credits, setCredits] = useState(null);
  const dropDownRef = useRef(null);
  const [dropDownConfig, setDropDownConfig] = useState({
    isOpen: false,
    position: { left: 0, top: 0 },
    items: [],
    name: "",
  });

  // Fetch user's credit balance when component mounts
  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`http://localhost:8000/api/v1/credits/${userId}`);
          setCredits(response.data.credits);
        }
      } catch (err) {
        console.error('Error fetching credits:', err);
      }
    };

    if (user) {
      fetchCredits();
    }
  }, [user]);

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
      <div className="flex flex-col gap-6 m-6">
        <FaTimes className="text-blue-500 hover:text-blue-700 text-2xl place-self-end" onClick={()=> navigate("/")} />
        
        {/* Display credits when user is logged in */}
        {user && (
          <div className="flex items-center justify-between bg-blue-50 py-2 px-4 rounded-md mb-2">
            <div className="flex items-center gap-2">
              <FaCoins className="text-yellow-500 text-xl animate-bounce-gentle" />
              <span className="text-blue-700 font-medium">{credits !== null ? credits : '--'}</span>
            </div>
            <Link to="/credits" className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
              <FaPlus />
            </Link>
          </div>
        )}
        
        <div className="hover:text-slate-500 cursor-pointer font-semibold border-b-2 border-blue-500">
          <Link to={"/contact"} className="text-blue-500 hover:text-blue-700">
            Contact
          </Link>
        </div>
        <div className="hover:text-slate-500 cursor-pointer font-semibold border-b-2 border-blue-500">
          <Link to="/features" className="text-blue-500 hover:text-blue-700">
            Features
          </Link>
        </div>
        <div className="hover:text-slate-500 cursor-pointer font-semibold border-b-2 border-blue-500">
          <Link to="/analyse" className="text-blue-500 hover:text-blue-700">
            Analyse
          </Link>
        </div>
        {user && (
          <div className="hover:text-slate-500 cursor-pointer font-semibold border-b-2 border-blue-500">
            <Link to="/credits" className="text-blue-500 hover:text-blue-700 flex items-center gap-2">
              <FaCoins className="text-yellow-500 text-xl animate-bounce-gentle" />
              <span>Add Credits</span>
            </Link>
          </div>
        )}
        <div
          className="hover:text-blue-700/90 text-blue-500 cursor-pointer font-semibold z-100 flex items-center gap-1 border-b-2 border-blue-500"
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
          className="hover:text-blue-700/90 text-blue-500 cursor-pointer font-semibold flex items-center gap-1 border-b-2 border-blue-500"
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

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default MobileNavigation;
