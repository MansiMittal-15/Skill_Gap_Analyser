import React from "react";
import greenTick from "../assets/check.png";
import bg_image from "../assets/white_bg2.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div
      className=" h-[90%] text-white flex"
      style={{
        backgroundImage: `url(${bg_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: "-10",
      }}
    >
      <div className=" w-full mx-auto text-black/80 flex max-sm:text-sm">
        <div className="max-w-[1200px] mx-auto h-[inherit] px-2 flex flex-col items-center justify-center gap-4 py-10">
          <div className="text-sm bg-slate-200 max-sm:text-[10px] text-black p-2 border rounded-3xl flex gap-2 justify-center items-center">
            <span>
              <img src={greenTick} alt="green tick" className="w-6 max-sm:w-4" />
            </span>
            <span className="text-blue-700">No. 1</span> AI based Skill Gap Analyser
          </div>
          <div className="text-7xl font-bold text-center max-sm:text-3xl max-md:text-4xl max-lg:text-5xl">
          <span className="text-5xl max-sm:text-xl max-md:text-2xl max-lg:text-3xl max-xl:text-4xl">Stay Ahead with</span> <br /> <span className="text-blue-700">AI-Powered Skill Insights</span> <br />
          </div>
          <div className="text-xl text-center max-sm:text-xs max-lg:text-lg font-normal max-md:text-sm">
          Identify, analyze, and close your skill gaps with real-time data from industry standards, job roles, and evolving market needs.
          </div>
          <div className="flex gap-6 max-sm:gap-2 max-md:gap-4">
            <Link to={"/analyse-form"}>
              <button className="border-[2px] max-lg:w-40 max-md:text-sm max-md:w-32 max-sm:text-xs max-sm:w-24 border-black p-2 text-lg w-52 rounded-xl bg-blue-700/90 text-white hover:bg-blue-800  ">
                Get Started
              </button>
            </Link>
            <Link to={"/services"}>
              <button className="border-[2px] max-lg:w-40 max-md:text-sm max-md:w-32 max-sm:text-xs max-sm:w-24 border-black p-2 text-lg w-52 rounded-xl bg-white text-black hover:bg-slate-200  ">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
