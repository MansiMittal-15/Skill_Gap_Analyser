import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ title, description }) => {
  const navigate = useNavigate();
  return (
    <div
  className={`relative border-2 border-gray-300 h-full flex flex-col justify-between rounded-xl p-6 my-4 bg-gradient-to-r from-slate-100 via-indigo-200 to-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300`}
>
  <h1 className="text-3xl text-blue-800 font-semibold mb-3">{title}</h1>
  <p className="text-base font-medium text-blue-700 mb-4">{description}</p>
  <button
    title={`Learn more about ${title}`}
    onClick={() => navigate(`/services?service=${encodeURIComponent(title)}`)}
    className="bg-indigo-500 text-white p-3 rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 transform hover:scale-105"
  >
    Learn More
  </button>
</div>
  );
};

export default ServiceCard;
