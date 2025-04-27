import React from "react";
import Header from "./Header";
import ServiceCard from "./ServiceCard";
import { serviceContent } from "../utils/ServicePageContent";

const ServiceList = () => {
  const servicesContent = serviceContent;
  return (
    <div>
      <Header />
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-10">
          <h1 className="mx-[24px] text-5xl font-medium py-2 border-b-black border-b-2 ">
            Explore Our Core Services
          </h1>
          <p className="text-xl font-extralight my-1 ">
            Optimized tools to help you make smarter pricing decisions powered
            by real-time data, analytics, and trends.
          </p>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 gap-5 my-4">
            {servicesContent.map((content) => {
              return (
                <ServiceCard
                  key={content.title}
                  title={content.title}
                  description={content.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
