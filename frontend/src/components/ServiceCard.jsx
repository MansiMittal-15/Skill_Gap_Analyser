import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ title, description }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`relative border-2 border-gray-400 flex flex-col justify-between rounded-xl p-2 my-2 bg-gradient-to-r from-slate-200 via-indigo-200 to-blue-200 `}
    >
      <h1 className="text-2xl text-blue-900 font-medium">{title}</h1>
      <p className="text-lg font-light my-2 text-blue-900">{description}</p>
      <button
        title={`learn more about ${title}`}
        onClick={() => navigate(`/services?service=${encodeURIComponent(title)}`)}
        className="bg-gray-100 p-2 rounded-xl hover:bg-gray-200/80 border-2 text-center border-gray-400"
      >
        Learn More
      </button>
    </div>
  );
};

export default ServiceCard;
