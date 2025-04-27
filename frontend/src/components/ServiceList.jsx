import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ServiceCard from "./ServiceCard";
import { serviceContent } from "../utils/ServicePageContent";

const ServiceList = () => {
  const servicesContent = serviceContent;
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 pb-4 relative">
            Explore Our Core Services
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-600 rounded-full"></span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Optimized tools to help you make smarter pricing decisions powered
            by real-time data, analytics, and trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesContent.map((content) => (
            <div 
              key={content.title}
              className="transform hover:-translate-y-1 transition-all duration-300 min-h-52"
            >
              <ServiceCard
                title={content.title}
                description={content.description}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Discover how our services can transform your business
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceList;
