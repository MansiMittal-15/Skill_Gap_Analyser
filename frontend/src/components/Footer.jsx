import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-black text-white/80 ">
      <div className="max-w-[1200px] mx-auto">
        <div className="mx-10">
          <div className="flex gap-10 py-10 justify-between border-b-2 border-b-white/40 max-sm:flex-col">
            <div className="flex flex-col w-[40%] gap-3 max-sm:w-full">
              <h1 className="text-4xl max-sm:text-2xl">Elevate Your Strategy with Skill Analyser</h1>
              <p className="text-sm">
              From startups to enterprises, see how real data on skills is driving smarter decisions, better growth, and bigger success stories.
              </p>
            </div>
            <div>
              <button onClick={()=> navigate('/analyse-form')} className="text-xl max-sm:text-base max-sm:p-4 text-white font-bold bg-blue-600 hover:bg-blue-700 p-6 rounded-full">
                Get Started
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-4 py-10 justify-between max-sm:flex-col max-md:gap-6 ">
              <div className="w-[30%] flex gap-4 flex-col max-sm:w-full ">
                <h1 className="text-2xl max-sm:text-xl">Skill Analyser</h1>
                <p className="text-sm max-sm:text-xs">
                Discover where you stand, bridge the gaps, and accelerate your journey to success — with intelligent, real-time skill assessments powered by AI.
                </p>
              </div>
              <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-16 w-[60%] max-lg:w-[70%] max-md:gap-6 ">
                <div className="flex flex-col gap-3 ">
                  <h3 className="text-xl max-sm:text-base">Help</h3>
                  <ul className="text-sm flex flex-col gap-2 max-sm:text-xs">
                    <li><Link to={'/'} className="hover:text-blue-500">Home</Link></li>
                    <li><Link to={'/blog'} className="hover:text-blue-500">Blog</Link></li>
                    <li><Link to={'/contact'} className="hover:text-blue-500">Contact</Link></li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3 ">
                  <h3 className="text-xl max-sm:text-base">Company</h3>
                  <ul className="text-sm flex flex-col gap-2 max-sm:text-xs">
                    <li><Link to={'/our-story'} className="hover:text-blue-500">Our Story</Link></li>
                    <li><Link to={'/careers'} className="hover:text-blue-500">Careers</Link></li>
                    <li><Link to={'/features'} className="hover:text-blue-500">Features</Link></li>
                  </ul>
                </div>
                <div className="flex flex-col gap-3 ">
                  <h3 className="text-xl max-sm:text-base">Social Media</h3>
                  <ul className="flex gap-4">
                    <li>
                      <FaFacebook className="text-2xl hover:bg-blue-600 cursor-pointer hover:text-white rounded-full" />
                    </li>
                    <li>
                      <FaInstagram className="text-2xl hover:bg-blue-600 cursor-pointer hover:text-white rounded-full" />
                    </li>
                    <li>
                      <FaLinkedin className="text-2xl hover:bg-blue-600 cursor-pointer hover:text-white rounded-full" />
                    </li>
                    <li>
                      <FaTwitter className="text-2xl hover:bg-blue-600 cursor-pointer hover:text-white rounded-full" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="py-6 text-sm flex justify-between max-sm:flex-col max-sm:gap-4">
              <div>
                &copy; Skill Analyser {new Date().getFullYear()} All Rights Reserved
              </div>
              <ul className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 ">
                <li><Link to={'/policy'} className="hover:text-blue-500">Privacy Policy</Link></li>
                <li><Link to={'/legal-stamp'} className="hover:text-blue-500">Legal Stamp</Link></li>
                <li><Link to={'/cookies-policy'} className="hover:text-blue-500">Cookies Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
